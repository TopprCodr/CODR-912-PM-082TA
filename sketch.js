var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common =Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Composite = Matter.Composite,
Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
world = engine.world;

// create renderer
var render = Render.create({
element: document.body,
engine: engine,
options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: 'rgb(0,100,25)'
}
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var stack = Composites.stack(100, 60 , 10, 5, 20, 50, function(x, y) {
return Bodies.rectangle(x, y, 40, 40 ,{
    render: {
        fillStyle:'orange',
        strokeStyle: 'black',
        lineWidth : 2
        
}});
});

Composite.add(world, [
stack,
// wall
Bodies.rectangle(400, 606, 800, 50.5, { isStatic: true })
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
