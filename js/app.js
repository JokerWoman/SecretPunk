let camera1, camera2, camera3, camera4, cameraWin, cameraLost, cameraLoading;
let renderer;
let scene1, scene2, scene3, scene4, sceneWin, sceneLost, sceneLoading;

let loader = 0

let myfont = null

let tempo1Mesh = null
let tempo2Mesh = null
let tempo3Mesh = null
let tempo4Mesh = null

let timer = null
let timerValue = 0


let SCENES_TIMEOUTS = {
    SCENE_ONE: 60,
    SCENE_TWO: 90,
    SCENE_THREE: 120,
    SCENE_FOUR: 150,
}


let SCENES = {
    SCENE_ONE: 1,
    SCENE_TWO: 2,
    SCENE_THREE: 3,
    SCENE_FOUR: 4,
    SCENE_WIN: 5,
    SCENE_LOST: 6,
    SCENE_LOADING: 7

};

let OBJECTS_PER_SCENE = {
    SCENE_ONE: 5,
    SCENE_TWO: 5,
    SCENE_THREE: 6,
    SCENE_FOUR: 6
};

let SCENE_ONE_OBJECTS = {
    PLANTA: 0,
    MASCARA: 1,
    ROBOT: 2,
    XADREZ: 3,
    HOLOGRAMA: 4
};

let SCENE_TWO_OBJECTS = {
    CEREAL: 0,
    CAFETEIRA: 1,
    BOLACHAS: 2,
    OVO_PARTIDO: 3,
    PAPEL: 4
};

let SCENE_THREE_OBJECTS = {
    CESTO: 0,
    CREME: 1,
    PAPEL: 2,
    SECADOR: 3,
    SPRAY: 4,
    WIG: 5
};

let SCENE_FOUR_OBJECTS = {
    ALMOFADA: 0,
    BRAÇO: 1,
    GAMEBOY: 2,
    MONITOR: 3,
    PISTOLA: 4,
    VR: 5
};

let GLTF_OBJECTS_IDENTIFIER = {
    OBJECT: 0,
    SCENE: 1,
    CHECK_MESH: 2,
    OBJECT_FOUND: 3
};

let sceneOneObjects = []
let sceneTwoObjects = []
let sceneThreeObjects = []
let sceneFourObjects = []

let currentScene = SCENES.SCENE_LOADING

let canvas;

function UpdateCanvasFullScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
}

function InitializeSceneObjetcsArray(scene) {
   
        sceneOneObjects = new Array(OBJECTS_PER_SCENE.SCENE_ONE);
        sceneTwoObjects = new Array(OBJECTS_PER_SCENE.SCENE_TWO);
        sceneThreeObjects = new Array(OBJECTS_PER_SCENE.SCENE_THREE);
        sceneFourObjects = new Array(OBJECTS_PER_SCENE.SCENE_FOUR);

        for (let i = 0; i < sceneOneObjects.length; i++) {
            sceneOneObjects[i] = new Array(4); /* GLTF_OBJECTS_IDENTIFIER para aceder a cada um*/
            sceneOneObjects[i][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = false
        }

        for (let i = 0; i < sceneTwoObjects.length; i++) {
            sceneTwoObjects[i] = new Array(4); /* GLTF_OBJECTS_IDENTIFIER para aceder a cada um*/
            sceneTwoObjects[i][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = false
        }

        for (let i = 0; i < sceneThreeObjects.length; i++) {
            sceneThreeObjects[i] = new Array(4); /* GLTF_OBJECTS_IDENTIFIER para aceder a cada um*/
            sceneThreeObjects[i][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = false
        }

        for (let i = 0; i < sceneFourObjects.length; i++) {
            sceneFourObjects[i] = new Array(4); /* GLTF_OBJECTS_IDENTIFIER para aceder a cada um*/
            sceneFourObjects[i][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = false
        }
    }

function init() {
    canvas = document.getElementById("webGLCanvas");
    UpdateCanvasFullScreen()
    InitializeSceneObjetcsArray()

    /* Renderer */
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.width, canvas.height);

    CreateSceneLoading();
    CreateSceneOne();
    CreateSceneTwo();
    CreateSceneThree();
    CreateSceneFour();
    CreateSceneWin();
    CreateSceneLost();

    animate();
}

function CreateTextGeometry(titulo, fonte, tamanho, altura) {
    return new THREE.TextGeometry(titulo, {
        font: fonte,
        size: tamanho,
        height: altura
    });
}

function CreateTextBasicMaterial(cor) {
    return new THREE.MeshBasicMaterial({ color: cor });
}

function CreateSceneLoading()
{
 /* Criar Scene */
 sceneLoading = new THREE.Scene();

 /* Criar Camera */
 cameraLoading = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 1, 1000);
 cameraLoading.position.set(-2.230, 4.030, 8.310);

 sceneLoading.add(cameraLoading);

 //let controls = new THREE.OrbitControls(camera);
 //controls.addEventListener('change', function() { renderer.render(scene, camera); });
 /* Adicionar a possibilidade de mapear eventos dom a elementos 3D */
 const domEvents = new THREEx.DomEvents(camera1, renderer.domElement);

 /* Criar Luz Ambiente */
 const ambient = new THREE.AmbientLight(0x404040, 2);
 sceneLoading.add(ambient);

 /* Criar Luz Direcional */
 const light = new THREE.DirectionalLight(0xffffff, 2);
 light.position.set(50, 50, 100);
 sceneLoading.add(light);

 /* Carregar a sala */
 let loader = new THREE.GLTFLoader();
 loader.load("./GLTFs/sceneLevelWin/trofeu/scene.gltf", function(gltf) {
    sceneLoading.add(gltf.scene);
     gltf.scene.position.set(-5.390, -0.290, -4.640);
     gltf.scene.rotation.set(0, 0.5, 0);
 });


}

function ResetTimerLostGame() {
    timerValue = 0
}

function StartTimerLostGame() {
    StopTimerLostGame()
    ResetTimerLostGame()
    timer = setInterval(UpdateTimerLostGame, 1000); /* 1 second each time */
}

function UpdateTimerLostGame() {
    let perdeuJogo = false

    if (currentScene !== SCENES.SCENE_LOST && currentScene !== SCENES.SCENE_WIN) {
        timerValue += 1
        if ((currentScene === SCENES.SCENE_ONE) && (timerValue >= SCENES_TIMEOUTS.SCENE_ONE)) {
            perdeuJogo = true
        } else if ((currentScene === SCENES.SCENE_TWO) && (timerValue >= SCENES_TIMEOUTS.SCENE_TWO)) {
            perdeuJogo = true
        } else if ((currentScene === SCENES.SCENE_THREE) && (timerValue >= SCENES_TIMEOUTS.SCENE_THREE)) {
            perdeuJogo = true
        } else if ((currentScene === SCENES.SCENE_FOUR) && (timerValue >= SCENES_TIMEOUTS.SCENE_FOUR)) {
            perdeuJogo = true
        }
    }

    if (perdeuJogo === true) {
        LostGame()
    }
}

function StopTimerLostGame() {
    if (timer) {
        clearInterval(timer)
        console.log("Stop timer periodico!")
    }

}

function LostGame() {
    console.log("Perdeu!")
    StopTimerLostGame();
    currentScene = SCENES.SCENE_LOST
}

function DesenharTempo() {
    let tempoMensagem = "Tempo decorrido: " + timerValue
    if (myfont !== null) {
        let geometry = CreateTextGeometry(tempoMensagem, myfont, 0.6, 0.01)

        tempo1Mesh.geometry = geometry;
        tempo2Mesh.geometry = geometry;
        tempo3Mesh.geometry = geometry;
        tempo4Mesh.geometry = geometry;
    }
}

function UpdateLoaderCount()
{
    loader++
    console.log("Loaded Objects: " + loader)
    if(loader >= 34)
    {
        StartTimerLostGame()
        currentScene = SCENES.SCENE_ONE
        console.log("Start Scene One")
    }
}

function CreateSceneOne() {

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
        UpdateLoaderCount()
        scene1.add(gltf.scene);
        gltf.scene.position.set(-5.390, -0.290, -4.640);
        gltf.scene.rotation.set(0, 0.5, 0);
    });

    /* Carregar a fonte e alguns textos */
    const loaderFont = new THREE.FontLoader();

    loaderFont.load('./fonts/Roboto_Regular.json', function(font) {
        UpdateLoaderCount()
        myfont = font
        /* Criar o texto do tempo e adicionar á scene */
        tempo1Mesh = new THREE.Mesh(CreateTextGeometry("Tempo decorrido: 0", myfont, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        tempo1Mesh.position.set(-5, 10, 0);
        scene1.add(tempo1Mesh);

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
        UpdateLoaderCount()
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(-2.460, 0.300, -8.720);
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.3, 0.3, 0.3)
        sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_ONE) {
                sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneOneObjects[SCENE_ONE_OBJECTS.PLANTA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });

    loader.load("./GLTFs/sceneLevelOne/mascara/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(17.330, 5.780, -11.700);
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(4.600, 0, -1.030);
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.010, 0.010, 0.010)
        sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_ONE) {
                sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneOneObjects[SCENE_ONE_OBJECTS.MASCARA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });
    loader.load("./GLTFs/sceneLevelOne/robot/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(11.180, 0.520, -7.670);
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.683, 0, -1.030);
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.300, 0.300, 0.300)
        sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_ONE) {
                sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneOneObjects[SCENE_ONE_OBJECTS.ROBOT][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });

    loader.load("./GLTFs/sceneLevelOne/xadrez/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(1.310, 2.050, -7.400);
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.510, 0, -1.030);
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(1, 1, 1)
        sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_ONE) {
                sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneOneObjects[SCENE_ONE_OBJECTS.XADREZ][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });

    loader.load("./GLTFs/sceneLevelOne/holograma/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(11.420, 1.290, -11.320);
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.510, 0, -1.030);
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.005, 0.005, 0.005)
        sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene1.add(sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_ONE) {
                sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneOneObjects[SCENE_ONE_OBJECTS.HOLOGRAMA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });
}

function CreateSceneTwo() {
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
        UpdateLoaderCount()
        scene2.add(gltf.scene);
        gltf.scene.position.set(-5.390, -0.290, -4.640);
        gltf.scene.rotation.set(0, 0.5, 0);
    });

    /* Carregar a fonte e alguns textos */
    const loaderFont = new THREE.FontLoader();

    loaderFont.load('./fonts/Roboto_Regular.json', function(font) {
        UpdateLoaderCount()
        myfont = font

        /* Criar o texto do tempo e adicionar á scene */
        tempo2Mesh = new THREE.Mesh(CreateTextGeometry("Tempo decorrido: 0", myfont, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        tempo2Mesh.position.set(-5, 10, 0);
        scene2.add(tempo2Mesh);

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
        UpdateLoaderCount()
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(11.310, 2.070, -10);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, -Math.PI);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.15, 0.1, 0.3)
        sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_TWO) {
                sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneTwoObjects[SCENE_TWO_OBJECTS.CEREAL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });

    loader.load("./GLTFs/sceneLevelTwo/cafetera/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(6.820, 2.590, -13.270);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.030, 0.030, 0.030)
        sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_TWO) {
                sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneTwoObjects[SCENE_TWO_OBJECTS.CAFETEIRA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });
    loader.load("./GLTFs/sceneLevelTwo/bolachas/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(9.880, 2.170, -15.070);
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.030, 0.030, 0.030)
        sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_TWO) {
                sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneTwoObjects[SCENE_TWO_OBJECTS.BOLACHAS][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });

    loader.load("./GLTFs/sceneLevelTwo/ovo_partido/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(4.100, 2.250, -9.920);
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.001, 0.001, 0.001)
        sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_TWO) {
                sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneTwoObjects[SCENE_TWO_OBJECTS.OVO_PARTIDO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });

    loader.load("./GLTFs/sceneLevelTwo/papel/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(17.510, 2.110, -9.370);
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-4.659, -Math.PI, 0.000);
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.010, 0.010, 0.030)
        sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene2.add(sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_TWO) {
                sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneTwoObjects[SCENE_TWO_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });
}

function CreateSceneThree() {

    /* Criar Scene */
    scene3 = new THREE.Scene();


    /* Criar Camera */
    camera3 = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 1, 1000);
    camera3.position.set(-2.230, 4.030, 8.310);

    scene3.add(camera3);

    /*
        ##################################
        #     Controlos do Three         #
        ##################################
        */
    //let controls = new THREE.OrbitControls(camera3);
    //controls.addEventListener('change', function() { renderer.render(scene3, camera3); });


    /* Adicionar a possibilidade de mapear eventos dom a elementos 3D */
    const domEvents = new THREEx.DomEvents(camera3, renderer.domElement);


    /* Criar Luz Ambiente */
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene3.add(ambient);

    /* Criar Luz Direcional */
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100);
    scene3.add(light);

    /* Carregar a sala */
    let loader = new THREE.GLTFLoader();
    loader.load("./GLTFs/sceneLevelThree/Banho/scene_Bath.gltf", function(gltf) {
        UpdateLoaderCount()
        scene3.add(gltf.scene);
        gltf.scene.position.set(-5.390, -0.290, -4.640);
        gltf.scene.rotation.set(0, 0.5, 0);
    });

    /* Carregar a fonte e alguns textos */
    const loaderFont = new THREE.FontLoader();

    loaderFont.load('./fonts/Roboto_Regular.json', function(font) {
        UpdateLoaderCount()
        myfont = font

        /* Criar o texto do tempo e adicionar á scene */
        tempo3Mesh = new THREE.Mesh(CreateTextGeometry("Tempo decorrido: 0", myfont, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        tempo3Mesh.position.set(-5, 10, 0);
        scene3.add(tempo3Mesh);

        /* Adicionar o titulo de objectos perdidos */
        let textoObjectosPerdidosMesh = new THREE.Mesh(CreateTextGeometry("Objectos Perdidos:", font, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectosPerdidosMesh.position.set(5, 10, 0);
        scene3.add(textoObjectosPerdidosMesh);

        /* Texto do Cesto de Roupa */
        let textoObjectoPerdido1Mesh = new THREE.Mesh(CreateTextGeometry("Cesto de Roupa", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido1Mesh.position.set(5, 8.5, 0);
        scene3.add(textoObjectoPerdido1Mesh);

        /* Check do Cesto encontrado */
        sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 8.5, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do Creme */
        let textoObjectoPerdido2Mesh = new THREE.Mesh(CreateTextGeometry("Creme", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido2Mesh.position.set(5, 7.5, 0);
        scene3.add(textoObjectoPerdido2Mesh);

        /* Check do Cesto encontrado */
        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 7.5, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do Papel */
        let textoObjectoPerdido6Mesh = new THREE.Mesh(CreateTextGeometry("Papel", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido6Mesh.position.set(5, 6.5, 0);
        scene3.add(textoObjectoPerdido6Mesh);

        /* Check do Papel */
        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 6.5, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do Secador */
        let textoObjectoPerdido7Mesh = new THREE.Mesh(CreateTextGeometry("Secador", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido7Mesh.position.set(5, 5.5, 0);
        scene3.add(textoObjectoPerdido7Mesh);

        /* Check do Secador */
        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 5.5, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do SPRAY */
        let textoObjectoPerdido8Mesh = new THREE.Mesh(CreateTextGeometry("Spray", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido8Mesh.position.set(5, 4.5, 0);
        scene3.add(textoObjectoPerdido8Mesh);

        /* Check do SPRAY */
        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 4.5, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do Peruca */
        let textoObjectoPerdido10Mesh = new THREE.Mesh(CreateTextGeometry("Estatua", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido10Mesh.position.set(5, 3.5, 0);
        scene3.add(textoObjectoPerdido10Mesh);

        /* Check do Peruca */
        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 3.5, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

    });

    /* Carregar a Cesto */
    loader.load("./GLTFs/sceneLevelThree/cesto/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(1.041, 0, -3.890);
        sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0, 0);
        sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(1, 1, 1)
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_THREE) {
                sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneThreeObjects[SCENE_THREE_OBJECTS.CESTO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });

    loader.load("./GLTFs/sceneLevelThree/creme/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(13.060, 2.970, -16.210);
        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0, -3.142);
        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.100, 0.100, 0.100)
        sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_THREE) {
                sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneThreeObjects[SCENE_THREE_OBJECTS.CREME][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });

    loader.load("./GLTFs/sceneLevelThree/papel/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(12.350, 1.270, -15.690);
        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0, -3.142);
        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.001, 0.001, 0.001)
        sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_THREE) {
                sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneThreeObjects[SCENE_THREE_OBJECTS.PAPEL][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });


    loader.load("./GLTFs/sceneLevelThree/secador/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(8.410, 0.380, -5.100);
        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(0.153, -0.950, -3.212);
        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.100, 0.100, 0.100)
        sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_THREE) {
                sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneThreeObjects[SCENE_THREE_OBJECTS.SECADOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });

    loader.load("./GLTFs/sceneLevelThree/spray/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(4.750, 3.680, -12.800);
        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0, -3.142);
        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.150, 0.150, 0.150)
        sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_THREE) {
                sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneThreeObjects[SCENE_THREE_OBJECTS.SPRAY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });


    loader.load("./GLTFs/sceneLevelThree/wig/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(23.520, 3.430, 5.200);
        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0.070, -1.059);
        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.001, 0.001, 0.001)
        sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.SCENE].position.set(-5.390, 0, 0);
        scene3.add(sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_THREE) {
                sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneThreeObjects[SCENE_THREE_OBJECTS.WIG][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });
}

function CreateSceneFour() {
    /* Criar Scene */
    scene4 = new THREE.Scene();


    /* Criar Camera */
    camera4 = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 1, 1000);
    camera4.position.set(-2.230, 4.030, 8.310);

    scene4.add(camera4);

    /*
        ##################################
        #     Controlos do Three         #
        ##################################
        */
    // let controls = new THREE.OrbitControls(camera4);
    //controls.addEventListener('change', function() { renderer.render(scene4, camera4); });


    /* Adicionar a possibilidade de mapear eventos dom a elementos 3D */
    const domEvents = new THREEx.DomEvents(camera4, renderer.domElement);


    /* Criar Luz Ambiente */
    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene4.add(ambient);

    /* Criar Luz Direcional */
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100);
    scene4.add(light);

    /* Carregar a sala */
    let loader = new THREE.GLTFLoader();
    loader.load("./GLTFs/sceneLevelFour/quarto/scene_bed.gltf", function(gltf) {
        UpdateLoaderCount()
        scene4.add(gltf.scene);
        gltf.scene.position.set(-5.390, -0.290, -4.640);
        gltf.scene.rotation.set(0, 0.5, 0);
    });


    const loaderFont = new THREE.FontLoader();

    loaderFont.load('./fonts/Roboto_Regular.json', function(font) {
        UpdateLoaderCount()
        myfont = font

        /* Criar o texto do tempo e adicionar á scene */
        tempo4Mesh = new THREE.Mesh(CreateTextGeometry("Tempo decorrido: 0", myfont, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        tempo4Mesh.position.set(-5, 10, 0);
        scene4.add(tempo4Mesh);

        /* Adicionar o titulo de objectos perdidos */
        let textoObjectosPerdidosMesh = new THREE.Mesh(CreateTextGeometry("Objectos Perdidos:", font, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectosPerdidosMesh.position.set(5, 10, 0);
        scene4.add(textoObjectosPerdidosMesh);

        /* Texto do Almofada */
        let textoObjectoPerdido1Mesh = new THREE.Mesh(CreateTextGeometry("Almofada", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido1Mesh.position.set(5, 8.5, 0);
        scene4.add(textoObjectoPerdido1Mesh);

        /* Check do Almofada encontrado */
        sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 8.5, 0);
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do Braço */
        let textoObjectoPerdido2Mesh = new THREE.Mesh(CreateTextGeometry("Braço Robot", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido2Mesh.position.set(5, 7.5, 0);
        scene4.add(textoObjectoPerdido2Mesh);

        /* Check do Braço encontrado */
        sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 7.5, 0);
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do GAMEBOY */
        let textoObjectoPerdido4Mesh = new THREE.Mesh(CreateTextGeometry("Game Boy", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido4Mesh.position.set(5, 6.5, 0);
        scene4.add(textoObjectoPerdido4Mesh);

        /* Check do Frasco */
        sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 6.5, 0);
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do Monitor */
        let textoObjectoPerdido7Mesh = new THREE.Mesh(CreateTextGeometry("Monitor", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido7Mesh.position.set(5, 5.5, 0);
        scene4.add(textoObjectoPerdido7Mesh);

        /* Check do Monitor */
        sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 5.5, 0);
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do Pistola */
        let textoObjectoPerdido8Mesh = new THREE.Mesh(CreateTextGeometry("Pistola", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido8Mesh.position.set(5, 4.5, 0);
        scene4.add(textoObjectoPerdido8Mesh);

        /* Check do Pistola */
        sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 4.5, 0);
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

        /* Texto do VR */
        let textoObjectoPerdido10Mesh = new THREE.Mesh(CreateTextGeometry("Oculos VR", font, 0.4, 0.01), CreateTextBasicMaterial(0x191919));
        textoObjectoPerdido10Mesh.position.set(5, 3.5, 0);
        scene4.add(textoObjectoPerdido10Mesh);

        /* Check do Peruca */
        sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH] = new THREE.Mesh(CreateTextGeometry("X", font, 0.4, 0.01), CreateTextBasicMaterial(0xff3535));
        sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].position.set(4, 3.5, 0);
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH]);
        sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false

    });


    loader.load("./GLTFs/sceneLevelFour/almofada/scene.gltf", function(gltf) {
        UpdateLoaderCount()
        sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(-9.559, 0.890, -3.890);
        sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-3.217, 0, 0);
        sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.500, 0.500, 0.500)
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_FOUR) {
                sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneFourObjects[SCENE_FOUR_OBJECTS.ALMOFADA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });

    loader.load("./GLTFs/sceneLevelFour/braço/scene.gltf", function(gltf) {
        UpdateLoaderCount()

        sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(2.060, 1.280, -9.990);
        sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0, 3.142);
        sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.050, 0.050, 0.050)
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_FOUR) {
                sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneFourObjects[SCENE_FOUR_OBJECTS.BRAÇO][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });

    });

    loader.load("./GLTFs/sceneLevelFour/game_Boy/scene.gltf", function(gltf) {
        UpdateLoaderCount()

        sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(-1.140, 1.020, 0);
        sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0, 3.142);
        sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(5, 5, 5)
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_FOUR) {
                sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneFourObjects[SCENE_FOUR_OBJECTS.GAMEBOY][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });


    loader.load("./GLTFs/sceneLevelFour/monitor/scene.gltf", function(gltf) {
        UpdateLoaderCount()

        sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(-13.760, 3.350, -7.890);
        sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.670, -0.020, 0.050);
        sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(1, 1, 1)
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_FOUR) {
                sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneFourObjects[SCENE_FOUR_OBJECTS.MONITOR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });

    loader.load("./GLTFs/sceneLevelFour/pistola/scene.gltf", function(gltf) {
        UpdateLoaderCount()

        sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(2.660, 7.080, -12.800);
        sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0, 1.981);
        sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.005, 0.005, 0.005)
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_FOUR) {
                sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneFourObjects[SCENE_FOUR_OBJECTS.PISTOLA][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });

    loader.load("./GLTFs/sceneLevelFour/vr/scene.gltf", function(gltf) {
        UpdateLoaderCount()

        sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.OBJECT] = gltf.scene.children[0] /* Children que contem o objecto para podermos controlar a posicao e rotacao */
        sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.SCENE] = gltf.scene /* Scene GLTF para podermos marcar como visible ou invisivel */

        sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.OBJECT].position.set(-2.810, 1.480, -12.130);
        sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.OBJECT].rotation.set(-1.517, 0.070, -1.059);
        sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.OBJECT].scale.set(0.500, 0.500, 0.500)
        scene4.add(sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.SCENE]);

        domEvents.addEventListener(sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.OBJECT], 'click', event => {
            if (currentScene === SCENES.SCENE_FOUR) {
                sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = true
                sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = false
                sceneFourObjects[SCENE_FOUR_OBJECTS.VR][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = true
            }
        });
    });
}

function ReInicializarJogo()
{
    for(let i = 0; i < sceneOneObjects.length; i++)
    {
        sceneOneObjects[i][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = false
        sceneOneObjects[i][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = true
        sceneOneObjects[i][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false
    }
   
    for(let i = 0; i < sceneTwoObjects.length; i++)
    {
        sceneTwoObjects[i][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = false
        sceneTwoObjects[i][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = true
        sceneTwoObjects[i][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false
    }

    for(let i = 0; i < sceneThreeObjects.length; i++)
    {
        sceneThreeObjects[i][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = false
        sceneThreeObjects[i][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = true
        sceneThreeObjects[i][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false
    }

    for(let i = 0; i < sceneFourObjects.length; i++)
    {
        sceneFourObjects[i][GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] = false
        sceneFourObjects[i][GLTF_OBJECTS_IDENTIFIER.SCENE].visible = true
        sceneFourObjects[i][GLTF_OBJECTS_IDENTIFIER.CHECK_MESH].visible = false
    }

    StartTimerLostGame()
    currentScene = SCENES.SCENE_ONE
}


function CreateSceneWin() {
    /* Criar Scene */
    sceneWin = new THREE.Scene();

    /* Criar Camera */
    cameraWin = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 1, 1000);
    cameraWin.position.set(-2.230, 4.030, 8.310);

    sceneWin.add(cameraWin);

    //let controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', function() { renderer.render(scene, camera); });
    /* Adicionar a possibilidade de mapear eventos dom a elementos 3D */
    const domEvents = new THREEx.DomEvents(cameraWin, renderer.domElement);

    /* Criar Luz Ambiente */
    const ambient = new THREE.AmbientLight(0x404040, 2);
    sceneWin.add(ambient);

    /* Criar Luz Direcional */
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100);
    sceneWin.add(light);

    /* Carregar a sala */
    let loader = new THREE.GLTFLoader();
    loader.load("./GLTFs/sceneLevelWin/trofeu/scene.gltf", function(gltf) {
        UpdateLoaderCount()

        sceneWin.add(gltf.scene);
        gltf.scene.position.set(-5.390, -0.290, -4.640);

        domEvents.addEventListener(gltf.scene.children[0], 'dblclick', event => {
            if (currentScene === SCENES.SCENE_WIN) {
                ReInicializarJogo()
            }
        });
    });

    /* Carregar a fonte e alguns textos */
    const loaderFont = new THREE.FontLoader();

    loaderFont.load('./fonts/Roboto_Regular.json', function(font) {
        UpdateLoaderCount()

        /* Adicionar o titulo de objectos perdidos */
        let textMesh = new THREE.Mesh(CreateTextGeometry("Ganhou!", font, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        textMesh.position.set(0, 10, 0);
        sceneWin.add(textMesh);
    });

}


function CreateSceneLost() {

    /* Criar Scene */
    sceneLost = new THREE.Scene();

    /* Criar Camera */
    cameraLost = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 1, 1000);
    cameraLost.position.set(-2.230, 4.030, 8.310);

    sceneLost.add(cameraLost);

    //let controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', function() { renderer.render(scene, camera); });
    /* Adicionar a possibilidade de mapear eventos dom a elementos 3D */
    const domEvents = new THREEx.DomEvents(cameraLost, renderer.domElement);

    /* Criar Luz Ambiente */
    const ambient = new THREE.AmbientLight(0x404040, 2);
    sceneLost.add(ambient);

    /* Criar Luz Direcional */
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100);
    sceneLost.add(light);

    /* Carregar a sala */
    let loader = new THREE.GLTFLoader();
    loader.load("./GLTFs/sceneLevelWin/trofeu/scene.gltf", function(gltf) {
        UpdateLoaderCount()

        sceneLost.add(gltf.scene);
        gltf.scene.position.set(-5.390, -0.290, -4.640);

        domEvents.addEventListener(gltf.scene.children[0], 'dblclick', event => {
            if (currentScene === SCENES.SCENE_LOST) {
                ReInicializarJogo()
            }
        });
    });

    /* Carregar a fonte e alguns textos */
    const loaderFont = new THREE.FontLoader();

    loaderFont.load('./fonts/Roboto_Regular.json', function(font) {
        UpdateLoaderCount()

        /* Adicionar o titulo de objectos perdidos */
        let textMesh = new THREE.Mesh(CreateTextGeometry("Perdeu!", font, 0.6, 0.01), CreateTextBasicMaterial(0x191919));
        textMesh.position.set(0, 10, 0);
        sceneLost.add(textMesh);
    });

}


function IsCurrentLevelDone()
{
    let status = false
    if (currentScene === SCENES.SCENE_ONE) {
        status = !sceneOneObjects.some(item => item[GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] === false)
    } else if (currentScene === SCENES.SCENE_TWO) {
        status = !sceneTwoObjects.some(item => item[GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] === false)
    } else if (currentScene === SCENES.SCENE_THREE) {
        status = !sceneThreeObjects.some(item => item[GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] === false)
    } else if (currentScene === SCENES.SCENE_FOUR) {
        status = !sceneFourObjects.some(item => item[GLTF_OBJECTS_IDENTIFIER.OBJECT_FOUND] === false)
    }
    return status
}


function animate() {
    requestAnimationFrame(animate);

    if (currentScene === SCENES.SCENE_ONE) {
        DesenharTempo()
        renderer.render(scene1, camera1);
        if (IsCurrentLevelDone() === true) {
            console.log("Level 1 Completed!")
            StartTimerLostGame()
            currentScene = SCENES.SCENE_TWO;
        }
    } else if (currentScene === SCENES.SCENE_TWO) {
        DesenharTempo()
        renderer.render(scene2, camera2);
        if (IsCurrentLevelDone() === true) {
            console.log("Level 2 Completed!")
            StartTimerLostGame()
            currentScene = SCENES.SCENE_THREE;
        }
    } else if (currentScene === SCENES.SCENE_THREE) {
        DesenharTempo()
        renderer.render(scene3, camera3);
        if (IsCurrentLevelDone() === true) {
            console.log("Level 3 Completed!")
            StartTimerLostGame()
            currentScene = SCENES.SCENE_FOUR;
        }
    } else if (currentScene === SCENES.SCENE_FOUR) {
        DesenharTempo()
        renderer.render(scene4, camera4);
        if (IsCurrentLevelDone() === true) {
            console.log("Level 4 Completed!")
            StopTimerLostGame();
            currentScene = SCENES.SCENE_WIN;
        }
    } else if (currentScene === SCENES.SCENE_WIN) {
        renderer.render(sceneWin, cameraWin);
    } else if (currentScene === SCENES.SCENE_LOST) {
        renderer.render(sceneLost, cameraLost);
    }
    else if (currentScene === SCENES.SCENE_LOADING) {
        renderer.render(sceneLoading, cameraLoading);
    }
}

function onWindowResize() {
    /* Sempre que a janela for resized actualizamos o tamanho do canvas */
    UpdateCanvasFullScreen()

    if (currentScene === SCENES.SCENE_ONE) {
        camera1.aspect = canvas.width / canvas.height;
        camera1.updateProjectionMatrix();
    } else if (currentScene === SCENES.SCENE_TWO) {
        camera2.aspect = canvas.width / canvas.height;
        camera2.updateProjectionMatrix();
    } else if (currentScene === SCENES.SCENE_THREE) {
        camera3.aspect = canvas.width / canvas.height;
        camera3.updateProjectionMatrix();
    } else if (currentScene === SCENES.SCENE_FOUR) {
        camera4.aspect = canvas.width / canvas.height;
        camera4.updateProjectionMatrix();
    } else if (currentScene === SCENES.SCENE_WIN) {
        cameraWin.aspect = canvas.width / canvas.height;
        cameraWin.updateProjectionMatrix();
    } else if (currentScene === SCENES.SCENE_LOST) {
        cameraLost.aspect = canvas.width / canvas.height;
        cameraLost.updateProjectionMatrix();
    }
    else if (currentScene === SCENES.SCENE_LOADING) {
        cameraLoading.aspect = canvas.width / canvas.height;
        cameraLoading.updateProjectionMatrix();
    }
    renderer.setSize(canvas.width, canvas.height);

}

window.addEventListener("resize", onWindowResize);