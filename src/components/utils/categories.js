export const CATEGORIES = [
  {
    id: "strawberry-cake",
    label: "STRAWBERRY CAKE",
    file: "/model/foods.glb",
    node: "lcake-a",
    colors: ["#edcf97", "#F04A2D"],
    info: "A soft sponge layered with fresh cream and ripe strawberries. Rotate to explore its glossy glaze and delicate crumb from every angle.",
  },
  {
    id: "fish",
    label: "FISH WITH NO HEAD",
    file: "/model/foods.glb",
    node: "fish-a",
    rotationX: 180,
    colors: [ "#E2573D","#144b78"],
    info: "A cleaned fillet caught mid-motion. Inspect the fins, scales and tail as it turns to reveal its full profile.",
  },
  {
    id: "fungus",
    label: "MUSHROOM",
    file: "/model/foods.glb",
    node: "fungus-a",
    colors: ["#ea00ff", "#2b1ea8"],
    info: "A plump cap on a sturdy stem. Spin it around to study the ridged underside and earthy silhouette in detail.",
  },
  {
    id: "hotdog",
    label: "HOT DOG",
    file: "/model/foods.glb",
    node: "hotdog-a",
    rotationY: 180,
    colors: ["#ea00ff", "#ffbb00"],
    info: "A grilled sausage nestled in a toasted bun. Turn it to see the char marks, toppings and soft bread from all sides.",
  },
  {
    id: "toast",
    label: "SANDWITCH",
    file: "/model/foods.glb",
    node: "toast-a",
    rotationY: 180,
    colors: ["#f5c000", "#D04638"],
    info: "Stacked layers pressed between golden bread. Rotate to reveal the fillings, crust and every crisp edge.",
  },
];

export const DEFAULT_CATEGORY = "fungus";

export const VIEWS = [
  { id: "front", label: "FRONT", rx: 0, ry: 0 },
  { id: "side", label: "SIDE", rx: 0, ry: 90 },
  { id: "top", label: "TOP", rx: 90, ry: 0 },
];
