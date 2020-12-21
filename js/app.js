let camera;
let renderer;
let scene;
let house;
let planta;
let plantaScene;
let canvas;
let textoObjectoPerdido1CheckMesh;

function updateCanvasFullScreen() {
    canvas.width = window.innerWidth;
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

    scene.add(camera);

    /* Adicionar a possibilidade de mapear eventos dom a elementos 3D */
    const domEvents = new THREEx.DomEvents(camera, renderer.domElement);


    /* Criar Luz Ambiente */
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    /* Criar Luz Direcional */
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100);
    scene.add(light);

    /* Carregar a sala */
    let loader = new THREE.GLTFLoader();
    loader.load("./GLTFs/sceneLevelOne/house/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        gltf.scene.position.set(-5.390, -0.290, -4.640);
        gltf.scene.rotation.set(0, 0.5, 0);
    });

    /* Carregar a fonte e alguns textos */
    const loaderFont = new THREE.FontLoader();

    let myFont = loaderFont.load('./fonts/Roboto_Regular.json', function(font) {

        const textGeometry = new THREE.TextGeometry("Objectos Perdidos:", {
            font: font,
            size: 0.6,
            height: 0.01,
        });

        const textGeometryObjecto1 = new THREE.TextGeometry("Planta", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        const textGeometryObjecto1Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        let textMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff3535 });


        let textMaterial = new THREE.MeshBasicMaterial({ color: 0x191919 });

        /* Adicionar o titulo de objectos perdidos */
        let textoObjectosPerdidosMesh = new THREE.Mesh(textGeometry, textMaterial);
        textoObjectosPerdidosMesh.position.set(5, 10, 0);
        scene.add(textoObjectosPerdidosMesh);

        /* Adicionar o objeto 1 */
        let textoObjectoPerdido1Mesh = new THREE.Mesh(textGeometryObjecto1, textMaterial);
        textoObjectoPerdido1Mesh.position.set(5, 8.5, 1);
        scene.add(textoObjectoPerdido1Mesh);

        /* Marcar como found */
        textoObjectoPerdido1CheckMesh = new THREE.Mesh(textGeometryObjecto1Check, textMaterial2);
        textoObjectoPerdido1CheckMesh.position.set(4, 8.5, 1);
        scene.add(textoObjectoPerdido1CheckMesh);
        textoObjectoPerdido1CheckMesh.visible = false

    });

    /* Carregar a planta */
    loader.load("./GLTFs/sceneLevelOne/planta/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        plantaScene = gltf.scene
        planta = gltf.scene.children[0];
        planta.position.set(-4.000, 0.300, -5);
        planta.rotation.set(-4.659, -Math.PI, 0.000);
        planta.scale.set(0.5, 0.5, 0.5)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(planta, 'click', event => {
            console.log("Planta foi encontrada!");
            scene.remove(plantaScene)
            textoObjectoPerdido1CheckMesh.visible = true
        });

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