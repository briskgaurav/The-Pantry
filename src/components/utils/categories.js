export const CATEGORIES = [
  {
    id: "strawberry-cake",
    label: "STRAWBERRY CAKE",
    mobileLabel: "CAKE",
    file: "/model/foods-optimized.glb",
    node: "lcake-a",
    colors: ["#edcf97", "#F04A2D"],
    info: "A soft sponge layered with fresh cream and ripe strawberries. Rotate to explore its glossy glaze and delicate crumb from every angle.",
    previews: ["/imgs/cake1.webp", "/imgs/cake2.webp", "/imgs/cake3.webp"],
  },
  {
    id: "fish",
    label: "FISH WITH NO HEAD",
    mobileLabel: "FISH TAIL",
    file: "/model/foods-optimized.glb",
    node: "fish-a",
    rotationX: 180,
    colors: ["#E2573D", "#144b78"],
    info: "A cleaned fillet caught mid-motion. Inspect the fins, scales and tail as it turns to reveal its full profile.",
    previews: ["/imgs/fish1.webp", "/imgs/fish2.webp", "/imgs/fish3.webp"],
  },
  {
    id: "fungus",
    label: "MUSHROOM",
    mobileLabel: "MUSHROOM",
    file: "/model/foods-optimized.glb",
    node: "fungus-a",
    colors: ["#ea00ff", "#2b1ea8"],
    info: "A plump cap on a sturdy stem. Spin it around to study the ridged underside and earthy silhouette in detail.",
    previews: ["/imgs/mushroom1.webp", "/imgs/mushroom2.webp", "/imgs/mushroom3.webp"],
  },
  {
    id: "hotdog",
    label: "HOT DOG",
    file: "/model/foods-optimized.glb",
    node: "hotdog-a",
    rotationY: 180,
    colors: ["#ea00ff", "#ffbb00"],
    info: "A grilled sausage nestled in a toasted bun. Turn it to see the char marks, toppings and soft bread from all sides.",
    previews: ["/imgs/dog1.webp", "/imgs/dog2.webp", "/imgs/dog3.webp"],
  },
  {
    id: "toast",
    label: "SANDWITCH",
    file: "/model/foods-optimized.glb",
    node: "toast-a",
    rotationY: 180,
    colors: ["#f5c000", "#D04638"],
    info: "Stacked layers pressed between golden bread. Rotate to reveal the fillings, crust and every crisp edge.",
    previews: ["/imgs/s1.webp", "/imgs/s2.webp", "/imgs/s3.webp"],
  },
];

export const DEFAULT_CATEGORY = "fungus";

export const VIEWS = [
  { id: "front", label: "FRONT", rx: 0, ry: 0 },
  { id: "side", label: "SIDE", rx: 0, ry: 90 },
  { id: "top", label: "TOP", rx: 90, ry: 0 },
];
