from src.domain.generation.dto import GenerationDTO, DataDTO, NodeDTO, EdgeDTO, GroupDTO, FishDTO
from src.domain.group.dal import GroupDAO
from src.domain.group.model import Group


class GraphBuilder:
    def __init__(self):
        self.node_counter = 0
        self.node_map = {}  # Maps object IDs to node IDs
        self.nodes = []
        self.edges = []

    def add_node(self, data: DataDTO) -> int:
        """Add a node and return its unique ID."""
        node_id = self.node_counter
        self.nodes.append(NodeDTO(id=node_id, data=[data]))
        self.node_counter += 1
        return node_id

    def add_edge(self, source: int, target: int):
        """Add an edge connecting source to target."""
        edge_id = len(self.edges)
        self.edges.append(EdgeDTO(id=edge_id, source=source, target=target))

    def process_group(self, group: Group):
        """Process a group and its relationships."""
        # Create a GroupDTO and corresponding node
        group_dto = GroupDTO(id=group.id, breed=group.breed, sex=group.sex)
        group_node_id = self.add_node(DataDTO(group=group_dto))
        self.node_map[group.id] = group_node_id

        # Process parent groups
        if group.father_group:
            father_id = self.node_map.get(group.father_group.ref.id)
            if father_id is not None:
                self.add_edge(source=group_node_id, target=father_id)
        if group.mother_group:
            mother_id = self.node_map.get(group.mother_group.ref.id)
            if mother_id is not None:
                self.add_edge(source=group_node_id, target=mother_id)

        # Process fishes in the group
        for fish in group.fishes:
            fish_dto = FishDTO(
                id=fish.id,
                weight=fish.weight,
                length=fish.length,
                height=fish.height,
                thickness=fish.thickness,
                eggs_weight=fish.eggs_weight,
                egg_weight=fish.egg_weight,
            )
            fish_node_id = self.add_node(DataDTO(fish=fish_dto))
            self.node_map[fish.id] = fish_node_id
            self.add_edge(source=group_node_id, target=fish_node_id)

            # Add parentage edges for the fish
            if fish.father_id is not None and fish.father_id in self.node_map.keys():
                self.add_edge(source=self.node_map[fish.father_id], target=fish_node_id)
            if fish.father_id is not None and fish.mother_id in self.node_map.keys():
                self.add_edge(source=self.node_map[fish.mother_id], target=fish_node_id)

    def build(self) -> GenerationDTO:
        return GenerationDTO(nodes=self.nodes, edges=self.edges)


async def get_generations() -> GenerationDTO:
    builder = GraphBuilder()
    for group in await GroupDAO().get_raw_list():
        builder.process_group(group)
    generation_dto = builder.build()
    return generation_dto