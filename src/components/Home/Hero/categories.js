export const CATEGORIES = [
  {
    id: "strawberry-cake",
    label: "STRAWBERRY CAKE",
    file: "/model/foods.glb",
    node: "lcake-a",
    colors: ["#edcf97", "#F04A2D"],
  },
  {
    id: "fish",
    label: "FISH WITH NO HEAD",
    file: "/model/foods.glb",
    node: "fish-a",
    rotationX: 180,
    colors: ["#144b78", "#E2573D"],
  },
  {
    id: "fungus",
    label: "MUSHROOM",
    file: "/model/foods.glb",
    node: "fungus-a",
    colors: ["#ea00ff", "#2b1ea8"],
  },
  {
    id: "hotdog",
    label: "HOT DOG",
    file: "/model/foods.glb",
    node: "hotdog-a",
    rotationY: 180,
    colors: ["#ea00ff", "#ffbb00"],
  },
  {
    id: "toast",
    label: "SANDWITCH",
    file: "/model/foods.glb",
    node: "toast-a",
    rotationY: 180,
    colors: ["#f5c000", "#D04638"],
  },
];

export const DEFAULT_CATEGORY = "fungus";

// Distinct camera-facing orientations for the "view" panel. Angles are in
// degrees and applied on a wrapper group that sits outside the idle animation.
export const VIEWS = [
  { id: "front", label: "FRONT", rx: 0, ry: 0 },
  { id: "side", label: "SIDE", rx: 0, ry: 90 },
  { id: "top", label: "TOP", rx: 90, ry: 0 },
];
