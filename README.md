# The Pantry

## Setup / Run

```bash
git clone https://github.com/briskgaurav/The-Pantry.git
cd The-Pantry
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Models

I used the 3D models from [Smooothy](https://smooothy.federic.ooo/). They’re saved locally at `public/model/foods-optimized.glb`.

## Decision Log

- I chose the models from [Smooothy](https://smooothy.federic.ooo/) instead of Sketchfab because they all share the same theme and are already optimized. Sketchfab models are often inconsistent, not optimized, and don’t feel like they belong together.
- I took design inspiration from [Factors](https://www.factors.design/) instead of starting from scratch, and then added UI/UX improvements that felt missing there.
- I made the angle viewer panel feel merged with the scene behind it instead of using a hard overlay, so opening it still feels like part of the same space.
- I added autoscroll and stopped page scrolling when the view panel opens, so you stay focused on the model while inspecting it.
- I added a parallax sticky footer instead of a plain static one, just for a bit of fun at the end of the page.
