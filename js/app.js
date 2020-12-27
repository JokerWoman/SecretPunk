let camera1, camera2;
let renderer;
let scene1, scene2;

let SCENES = {
    SCENE_ONE:  1, 
    SCENE_TWO:  2
  };

let OBJECTS_PER_SCENE = {
    SCENE_ONE:  5, 
    SCENE_TWO:  5
};

let SCENE_ONE_OBJECTS = {
    PLANTA:  0, 
    MASCARA:  1,
    ROBOT:  2,
    XADREZ:  3,
    HOLOGRAMA:  4,
};

let SCENE_TWO_OBJECTS = {
    CEREAL:  0, 
    CAFETEIRA:  1,
    BOLACHAS:  2,
    OVO_PARTIDO:  3,
    PAPEL:  4,
};

let GLTF_OBJECTS_IDENTIFIER = {
    OBJECT:  0, 
    SCENE:  1,
    CHECK_MESH:  2
};

let sceneOneObjects = []
let sceneTwoObjects = []

let currentScene = SCENES.SCENE_ONE
let currentSceneObjectosFound = 0

let canvas;

function UpdateCanvasFullScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
}

function InitializeSceneObjetcsArray(scene)
{
    if(scene == SCENES.SCENE_ONE)
    {
        sceneOneObjects = new Array(OBJECTS_PER_SCENE.SCENE_ONE);

        for(let i = 0; i < sceneOneObjects.length; i++)
        {
            sceneOneObjects[i] = new Array(3); /* GLTF_OBJECTS_IDENTIFIER para aceder a cada um*/ 
        }
    }
    else if(scene == SCENES.SCENE_TWO)
    {
        sceneTwoObjects = new Array(OBJECTS_PER_SCENE.SCENE_TWO);

        for(let i = 0; i < sceneTwoObjects.length; i++)
        {
            sceneTwoObjects[i] = new Array(3); /* GLTF_OBJECTS_IDENTIFIER para aceder a cada um*/ 
        }
    }

}

function init() {
    canvas = document.getElementById("webGLCanvas");

    UpdateCanvasFullScreen()

    /* Renderer */
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.width, canvas.height);

    CreateSceneOne();

    animate();
}

function CreateTextGeometry(titulo, fonte, tamanho, altura)
{
    return new THREE.TextGeometry(titulo, {
        font: fonte,
        size: tamanho,
        height: altura
    });
}

function CreateTextBasicMaterial(cor)
{
    return new THREE.MeshBasicMaterial({ color: cor });
}

function CreateSceneOne()
{
    /* Inicializar o Array de Objectos e o check de cada um deles */
    InitializeSceneObjetcsArray(SCENES.SCENE_ONE)

    /* Criar Scene */
    scene1 = new THREE.Scene();

    /* Criar Camera */
    camera1 = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 1, 1000);
    camera1.position.set(-2.230, 4.030, 8.310);

    scene1.add(camera1);

    //let controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', function() { renderer.render(scene, camera); });
    /* Adicionar a possibilidade de mapear eventos dom a elementos 3D */
    const domEvents = new THREEx.DomEvents(camera1, renderer.domElement);

    /* Criar Luz Ambiente */
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene1.add(ambient);

    /* Criar Luz Direcional */
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100);
    scene1.add(light);

    /* Carregar a sala */
    let loader = new THREE.GLTFLoader();
    loader.load("./GLTFs/sceneLevelOne/house/scene.gltf", function(gltf) {
        scene1.add(gltf.scene);
        gltf.scene.position.set(-5.390, -0.290, -4.640);
        gltf.scene.rotation.set(0, 0.5, 0);
    });

    /* Carregar a fonte e alguns textos */
    const loaderFont = new THREE.FontLoader();

    loaderFont.load('./fonts/Roboto_Regular.json', function(font) {
        /* Adicionar o titulo de objectos perdidos */
        let textoObjectosPerdidosMesh = new THREE.Mesh(CreateTextGeometry("Objectos Perdidos:", font, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectosPerdidosMesh.position.set(5, 10, 0);
        scene1.add(textoObjectosPerdidosMesh);

        /* Texto da planta */
        let textoObjectoPerdido1Mesh = new THREE.Mesh(CreateTextGeometry("Planta", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido1Mesh.position.set(5, 8.5, 1);
        scene1.add(textoObjectoPerdido1Mesh);

        /* Check da planta encontrada */
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 8.5, 1);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto da mascara */
        let textoObjectoPerdido2Mesh = new THREE.Mesh(CreateTextGeometry("Mascara", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido2Mesh.position.set(5, 7.5, 1);
        scene1.add(textoObjectoPerdido2Mesh);

        /* Check da Mascara encontrada */
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 7.5, 1);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do robot */
        let textoObjectoPerdido3Mesh = new THREE.Mesh(CreateTextGeometry("Robot", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido3Mesh.position.set(5, 6.5, 1);
        scene1.add(textoObjectoPerdido3Mesh);

        /* Check do robot encontrado */
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 6.5, 1);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do xadrez */
        let textoObjectoPerdido4Mesh = new THREE.Mesh(CreateTextGeometry("Xadrez", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido4Mesh.position.set(5, 5.5, 1);
        scene1.add(textoObjectoPerdido4Mesh);

        /* Ceck do xadrez encontrado */
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 5.5, 1);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto Holograma */
        let textoObjectoPerdido5Mesh = new THREE.Mesh(CreateTextGeometry("Holograma", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido5Mesh.position.set(5, 4.5, 1);
        scene1.add(textoObjectoPerdido5Mesh);

        /* Check do holograma encontrado */
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 4.5, 1);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false
    });

    /* Carregar a planta */
    loader.load("./GLTFs/sceneLevelOne/planta/scene.gltf", function(gltf) {
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(-2.460, 0.300, -8.720);
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.3, 0.3, 0.3)
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene1.remove(sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelOne/mascara/scene.gltf", function(gltf) {
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(17.330, 5.780, -11.700);
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(4.600, 0, -1.030);
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.010, 0.010, 0.010)
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene1.remove(sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });

    });
    loader.load("./GLTFs/sceneLevelOne/robot/scene.gltf", function(gltf) {
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(11.180, 0.520, -7.670);
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.683, 0, -1.030);
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.300, 0.300, 0.300)
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene1.remove(sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelOne/xadrez/scene.gltf", function(gltf) {
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(1.310, 2.050, -7.400);
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.510, 0, -1.030);
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(1, 1, 1)
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene1.remove(sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelOne/holograma/scene.gltf", function(gltf) {
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(11.420, 1.290, -11.320);
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.510, 0, -1.030);
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.005, 0.005, 0.005)
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene1.remove(sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });

    });
}

function CreateSceneTwo() {

    /* Inicializar o Array de Objectos e o check de cada um deles */
    InitializeSceneObjetcsArray(SCENES.SCENE_TWO)

    /* Criar Scene */
    scene2 = new THREE.Scene();
    

    /* Criar Camera */
    camera2 = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 1, 1000);
    camera2.position.set(-2.230, 4.030, 8.310);

    scene2.add(camera2);

    /*
        ##################################
        #     Controlos do Three         #
        ##################################
        */
    //let controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', function() { renderer.render(scene, camera); });


    /* Adicionar a possibilidade de mapear eventos dom a elementos 3D */
    const domEvents = new THREEx.DomEvents(camera2, renderer.domElement);


    /* Criar Luz Ambiente */
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene2.add(ambient);

    /* Criar Luz Direcional */
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100);
    scene2.add(light);

    /* Carregar a sala */
    let loader = new THREE.GLTFLoader();
    loader.load("./GLTFs/sceneLevelTwo/cozinha/scene_Kitchen.gltf", function(gltf) {
        scene2.add(gltf.scene);
        gltf.scene.position.set(-5.390, -0.290, -4.640);
        gltf.scene.rotation.set(0, 0.5, 0);
    });

    /* Carregar a fonte e alguns textos */
    const loaderFont = new THREE.FontLoader();

    loaderFont.load('./fonts/Roboto_Regular.json', function(font) {

        /* Adicionar o titulo de objectos perdidos */
        let textoObjectosPerdidosMesh = new THREE.Mesh(CreateTextGeometry("Objectos Perdidos:", font, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectosPerdidosMesh.position.set(5, 10, 0);
        scene2.add(textoObjectosPerdidosMesh);

        /* Texto do cereal */
        let textoObjectoPerdido1Mesh = new THREE.Mesh(CreateTextGeometry("Cereal", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido1Mesh.position.set(5, 8.5, 0);
        scene2.add(textoObjectoPerdido1Mesh);

        /* Check do cereal encontrado */
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 8.5, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto da cafeteira */
        let textoObjectoPerdido2Mesh = new THREE.Mesh(CreateTextGeometry("Cafeteira", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido2Mesh.position.set(5, 7.5, 0);
        scene2.add(textoObjectoPerdido2Mesh);

        /* Check da cafeteira encontrada */
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 7.5, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto das bolachas */
        let textoObjectoPerdido3Mesh = new THREE.Mesh(CreateTextGeometry("Bolachas", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido3Mesh.position.set(5, 6.5, 0);
        scene2.add(textoObjectoPerdido3Mesh);

        /* Check das bolachas encontradas */
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 6.5, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do ovo partido */
        let textoObjectoPerdido4Mesh = new THREE.Mesh(CreateTextGeometry("Ovo Partido", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido4Mesh.position.set(5, 5.5, 0);
        scene2.add(textoObjectoPerdido4Mesh);

        /* Check do ovo partido encontrado */
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 5.5, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do papel */
        let textoObjectoPerdido5Mesh = new THREE.Mesh(CreateTextGeometry("Papel", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido5Mesh.position.set(5, 4.5, 0);
        scene2.add(textoObjectoPerdido5Mesh);

        /* Check do papel encontrado */
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 4.5, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

    });

    /* Carregar a Cereal */
    loader.load("./GLTFs/sceneLevelTwo/cereal/scene.gltf", function(gltf) {
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */
    
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(11.310, 2.070, -10);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, -Math.PI);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.15, 0.1, 0.3)
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.SCENE]);
    
        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene2.remove(sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelTwo/cafetera/scene.gltf", function(gltf) {
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */
    
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(6.820, 2.590, -13.270);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.030, 0.030, 0.030)
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.SCENE]);
    
        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene2.remove(sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });

    });
    loader.load("./GLTFs/sceneLevelTwo/bolachas/scene.gltf", function(gltf) {
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */
    
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(9.880, 2.170, -15.070);
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.030, 0.030, 0.030)
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.SCENE]);
    
        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene2.remove(sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });
    });

    loader.load("./GLTFs/sceneLevelTwo/ovo_partido/scene.gltf", function(gltf) {
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */
    
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(4.100, 2.250, -9.920);
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.001, 0.001, 0.001)
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.SCENE]);
    
        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene2.remove(sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });
    });

    loader.load("./GLTFs/sceneLevelTwo/papel/scene.gltf", function(gltf) {
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */
    
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(17.510, 2.110, -9.370);
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.010, 0.010, 0.030)
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE]);
    
        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            currentSceneObjectosFound++
            scene2.remove(sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE])
            sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
        });
    });
}


function animate() {
    requestAnimationFrame(animate);
    
    if(currentScene === SCENES.SCENE_ONE)
    {
        renderer.render(scene1, camera1);
        if(currentSceneObjectosFound == sceneOneObjects.length)
        {
            CreateSceneTwo();
            currentSceneObjectosFound = 0 // restart para a proxima scene
            setTimeout(function(){currentScene = SCENES.SCENE_TWO}, 2000);
        }
    }else if(currentScene === SCENES.SCENE_TWO)
    {
        renderer.render(scene2, camera2);
    }
}

function onWindowResize() {
    /* Sempre que a janela for resized actualizamos o tamanho do canvas */
    UpdateCanvasFullScreen()

    if(currentScene === SCENES.SCENE_ONE)
    {
        camera1.aspect = canvas.width / canvas.height;
        camera1.updateProjectionMatrix();
    }else if(currentScene === SCENES.SCENE_TWO)
    {
        camera2.aspect = canvas.width / canvas.height;
        camera2.updateProjectionMatrix();
    }

    renderer.setSize(canvas.width, canvas.height);
}

window.addEventListener("resize", onWindowResize);