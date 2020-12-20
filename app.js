let container;
let camera;
let renderer;
let scene;
let house;
let planta;
let canvas;

function updateCanvasFullScreen()
{
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight
}

function init() {
    canvas = document.getElementById("webGLCanvas");
    
    updateCanvasFullScreen()

    /* Renderer */
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.width, canvas.height);

    /* Criar Scene */
    scene = new THREE.Scene();

    /* Criar Camera */
    camera = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 1, 1000);
    camera.position.set(-2.230, 4.030, 8.310);
    camera.rotation.set(0, -0.6, 0);

    scene.add(camera);
    
    /* Criar Luz Ambiente */
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    /* Criar Luz Direcional */
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100);
    scene.add(light);

    /* Carregar a sala */
    let loader = new THREE.GLTFLoader();
    loader.load("./house/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        house = gltf.scene.children[0];

    });

    /* Carregar a planta */
    loader.load("./planta/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        planta = gltf.scene.children[0];
        planta.position.set(-4.000, 0.300, -5);
        planta.rotation.set(-4.659, -Math.PI, 0.000);
        planta.scale.set(0.5, 0.5, 0.5)

    });
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    /* Sempre que a janela for resized actualizamos o tamanho do canvas */
    updateCanvasFullScreen()

    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvas.width, canvas.height);
}

window.addEventListener("resize", onWindowResize);