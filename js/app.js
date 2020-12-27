let camera;
let renderer;
let scene;
let house;
let planta, plantaScene;
let cereal, cerealScene;
let cafetera, cafeteraScene;
let ovo, ovoScene;
let bolacha, bolachaScene;
let papel, papelScene;
let mascara, mascaraScene;
let robot, robotScene;
let xadrez, xadrezScene;
let holograma, hologramaScene;

let canvas;
let textoObjectoPerdido1CheckMesh, textoObjectoPerdido2CheckMesh;

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

    let controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function() { renderer.render(scene, camera); });
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
        const textGeometryObjecto2 = new THREE.TextGeometry("Mascara", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto3 = new THREE.TextGeometry("Robot", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        const textGeometryObjecto4 = new THREE.TextGeometry("Xadrez", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto5 = new THREE.TextGeometry("Holograma", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        const textGeometryObjecto1Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        const textGeometryObjecto2Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto3Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto4Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto5Check = new THREE.TextGeometry("X", {
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

        /* Adicionar o objeto 2 */
        let textoObjectoPerdido2Mesh = new THREE.Mesh(textGeometryObjecto2, textMaterial);
        textoObjectoPerdido2Mesh.position.set(5, 7.5, 1);
        scene.add(textoObjectoPerdido2Mesh);

        /* Marcar como found */
        textoObjectoPerdido2CheckMesh = new THREE.Mesh(textGeometryObjecto2Check, textMaterial2);
        textoObjectoPerdido2CheckMesh.position.set(4, 7.5, 1);
        scene.add(textoObjectoPerdido2CheckMesh);
        textoObjectoPerdido2CheckMesh.visible = false

        /* Adicionar o objeto 3 */
        let textoObjectoPerdido3Mesh = new THREE.Mesh(textGeometryObjecto3, textMaterial);
        textoObjectoPerdido3Mesh.position.set(5, 6.5, 1);
        scene.add(textoObjectoPerdido3Mesh);

        /* Marcar como found */
        textoObjectoPerdido3CheckMesh = new THREE.Mesh(textGeometryObjecto3Check, textMaterial2);
        textoObjectoPerdido3CheckMesh.position.set(4, 6.5, 1);
        scene.add(textoObjectoPerdido3CheckMesh);
        textoObjectoPerdido3CheckMesh.visible = false

        /* Adicionar o objeto 4 */
        let textoObjectoPerdido4Mesh = new THREE.Mesh(textGeometryObjecto4, textMaterial);
        textoObjectoPerdido4Mesh.position.set(5, 5.5, 1);
        scene.add(textoObjectoPerdido4Mesh);

        /* Marcar como found */
        textoObjectoPerdido4CheckMesh = new THREE.Mesh(textGeometryObjecto4Check, textMaterial2);
        textoObjectoPerdido4CheckMesh.position.set(4, 5.5, 1);
        scene.add(textoObjectoPerdido4CheckMesh);
        textoObjectoPerdido4CheckMesh.visible = false

        /* Adicionar o objeto 4 */
        let textoObjectoPerdido5Mesh = new THREE.Mesh(textGeometryObjecto5, textMaterial);
        textoObjectoPerdido5Mesh.position.set(5, 4.5, 1);
        scene.add(textoObjectoPerdido5Mesh);

        /* Marcar como found */
        textoObjectoPerdido5CheckMesh = new THREE.Mesh(textGeometryObjecto5Check, textMaterial2);
        textoObjectoPerdido5CheckMesh.position.set(4, 4.5, 1);
        scene.add(textoObjectoPerdido5CheckMesh);
        textoObjectoPerdido5CheckMesh.visible = false


    });

    /* Carregar a planta */
    loader.load("./GLTFs/sceneLevelOne/planta/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        plantaScene = gltf.scene
        planta = gltf.scene.children[0];
        planta.position.set(-2.460, 0.300, -8.720);
        planta.rotation.set(-4.659, -Math.PI, 0.000);
        planta.scale.set(0.3, 0.3, 0.3)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(planta, 'click', event => {
            console.log("Planta foi encontrada!");
            scene.remove(plantaScene)
            textoObjectoPerdido1CheckMesh.visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelOne/mascara/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        mascaraScene = gltf.scene
        mascara = gltf.scene.children[0];
        mascara.position.set(17.330, 5.780, -11.700);
        mascara.rotation.set(4.600, 0, -1.030);
        mascara.scale.set(0.010, 0.010, 0.010)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(mascara, 'click', event => {
            console.log("Mascara foi encontrada!");
            scene.remove(mascaraScene)
            textoObjectoPerdido2CheckMesh.visible = true
        });

    });
    loader.load("./GLTFs/sceneLevelOne/robot/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        robotScene = gltf.scene
        robot = gltf.scene.children[0];
        robot.position.set(11.180, 0.520, -7.670);
        robot.rotation.set(-1.683, 0, -1.030);
        robot.scale.set(0.300, 0.300, 0.300)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(robot, 'click', event => {
            console.log("Robot foi encontrada!");
            scene.remove(robotScene)
            textoObjectoPerdido3CheckMesh.visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelOne/xadrez/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        xadrezScene = gltf.scene
        xadrez = gltf.scene.children[0];
        xadrez.position.set(1.310, 2.050, -7.400);
        xadrez.rotation.set(-1.510, 0, -1.030);
        xadrez.scale.set(1, 1, 1)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(xadrez, 'click', event => {
            console.log("xadrez foi encontrada!");
            scene.remove(xadrezScene)
            textoObjectoPerdido4CheckMesh.visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelOne/holograma/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        hologramaScene = gltf.scene
        holograma = gltf.scene.children[0];
        holograma.position.set(11.420, 1.290, -11.320);
        holograma.rotation.set(-1.510, 0, -1.030);
        holograma.scale.set(0.005, 0.005, 0.005)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(holograma, 'click', event => {
            console.log("holograma foi encontrada!");
            scene.remove(hologramaScene)
            textoObjectoPerdido5CheckMesh.visible = true
        });

    });



    animate();
}

function init2() {
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

    /*
        ##################################
        #     Controlos do Three         #
        ##################################
        */
    //let controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', function() { renderer.render(scene, camera); });


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
    loader.load("./GLTFs/sceneLevelTwo/cozinha/scene_Kitchen.gltf", function(gltf) {
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

        const textGeometryObjecto1 = new THREE.TextGeometry("Cereal", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        const textGeometryObjecto2 = new THREE.TextGeometry("Cafetera", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto3 = new THREE.TextGeometry("Bolachas", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto4 = new THREE.TextGeometry("Ovo Partido", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto5 = new THREE.TextGeometry("Papel", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        const textGeometryObjecto1Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        const textGeometryObjecto2Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });

        const textGeometryObjecto3Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto4Check = new THREE.TextGeometry("X", {
            font: font,
            size: 0.4,
            height: 0.01,
        });
        const textGeometryObjecto5Check = new THREE.TextGeometry("X", {
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
        textoObjectoPerdido1Mesh.position.set(5, 8.5, 0);
        scene.add(textoObjectoPerdido1Mesh);

        /* Marcar como found */
        textoObjectoPerdido1CheckMesh = new THREE.Mesh(textGeometryObjecto1Check, textMaterial2);
        textoObjectoPerdido1CheckMesh.position.set(4, 8.5, 0);
        scene.add(textoObjectoPerdido1CheckMesh);
        textoObjectoPerdido1CheckMesh.visible = false

        /* Adicionar o objeto 2 */
        let textoObjectoPerdido2Mesh = new THREE.Mesh(textGeometryObjecto2, textMaterial);
        textoObjectoPerdido2Mesh.position.set(5, 7.5, 0);
        scene.add(textoObjectoPerdido2Mesh);

        /* Marcar como found */
        textoObjectoPerdido2CheckMesh = new THREE.Mesh(textGeometryObjecto2Check, textMaterial2);
        textoObjectoPerdido2CheckMesh.position.set(4, 7.5, 0);
        scene.add(textoObjectoPerdido2CheckMesh);
        textoObjectoPerdido2CheckMesh.visible = false

        /* Adicionar o objeto 3 */
        let textoObjectoPerdido3Mesh = new THREE.Mesh(textGeometryObjecto3, textMaterial);
        textoObjectoPerdido3Mesh.position.set(5, 6.5, 0);
        scene.add(textoObjectoPerdido3Mesh);

        /* Marcar como found */
        textoObjectoPerdido3CheckMesh = new THREE.Mesh(textGeometryObjecto3Check, textMaterial2);
        textoObjectoPerdido3CheckMesh.position.set(4, 6.5, 0);
        scene.add(textoObjectoPerdido3CheckMesh);
        textoObjectoPerdido3CheckMesh.visible = false

        /* Adicionar o objeto 4 */
        let textoObjectoPerdido4Mesh = new THREE.Mesh(textGeometryObjecto4, textMaterial);
        textoObjectoPerdido4Mesh.position.set(5, 5.5, 0);
        scene.add(textoObjectoPerdido4Mesh);

        /* Marcar como found */
        textoObjectoPerdido4CheckMesh = new THREE.Mesh(textGeometryObjecto4Check, textMaterial2);
        textoObjectoPerdido4CheckMesh.position.set(4, 5.5, 0);
        scene.add(textoObjectoPerdido4CheckMesh);
        textoObjectoPerdido4CheckMesh.visible = false

        /* Adicionar o objeto 5 */
        let textoObjectoPerdido5Mesh = new THREE.Mesh(textGeometryObjecto5, textMaterial);
        textoObjectoPerdido5Mesh.position.set(5, 4.5, 0);
        scene.add(textoObjectoPerdido5Mesh);

        /* Marcar como found */
        textoObjectoPerdido5CheckMesh = new THREE.Mesh(textGeometryObjecto5Check, textMaterial2);
        textoObjectoPerdido5CheckMesh.position.set(4, 4.5, 0);
        scene.add(textoObjectoPerdido5CheckMesh);
        textoObjectoPerdido5CheckMesh.visible = false

    });

    /* Carregar a Cereal */
    loader.load("./GLTFs/sceneLevelTwo/cereal/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        cerealScene = gltf.scene
        cereal = gltf.scene.children[0];
        cereal.position.set(11.310, 2.070, -10);
        cereal.rotation.set(-4.659, -Math.PI, -Math.PI);
        cereal.scale.set(0.15, 0.1, 0.3)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(cereal, 'click', event => {
            console.log("Cereal foi encontrada!");
            scene.remove(cerealScene)
            textoObjectoPerdido1CheckMesh.visible = true
        });

    });
    loader.load("./GLTFs/sceneLevelTwo/cafetera/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        cafeteraScene = gltf.scene
        cafetera = gltf.scene.children[0];
        cafetera.position.set(6.820, 2.590, -13.270);
        cafetera.rotation.set(-4.659, -Math.PI, 0.000);
        cafetera.scale.set(0.030, 0.030, 0.030)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(cafetera, 'click', event => {
            console.log("Cafetera foi encontrada!");
            scene.remove(cafeteraScene)
            textoObjectoPerdido2CheckMesh.visible = true
        });

    });
    loader.load("./GLTFs/sceneLevelTwo/bolachas/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        bolachaScene = gltf.scene
        bolacha = gltf.scene.children[0];
        bolacha.position.set(9.880, 2.170, -15.070);
        bolacha.rotation.set(-4.659, -Math.PI, 0.000);
        bolacha.scale.set(0.030, 0.030, 0.030)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(bolacha, 'click', event => {
            console.log("Bolacha foi encontrada!");
            scene.remove(bolachaScene)
            textoObjectoPerdido3CheckMesh.visible = true
        });

    });
    loader.load("./GLTFs/sceneLevelTwo/ovo_partido/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        ovoScene = gltf.scene
        ovo = gltf.scene.children[0];
        ovo.position.set(4.100, 2.250, -9.920);
        ovo.rotation.set(-4.659, -Math.PI, 0.000);
        ovo.scale.set(0.001, 0.001, 0.001)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(ovo, 'click', event => {
            console.log("Ovo Partido foi encontrada!");
            scene.remove(ovoScene)
            textoObjectoPerdido4CheckMesh.visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelTwo/papel/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        papelScene = gltf.scene
        papel = gltf.scene.children[0];
        papel.position.set(17.510, 2.110, -9.370);
        papel.rotation.set(-4.659, -Math.PI, 0.000);
        papel.scale.set(0.010, 0.010, 0.030)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(papel, 'click', event => {
            console.log("Papel foi encontrada!");
            scene.remove(papelScene)
            textoObjectoPerdido5CheckMesh.visible = true
        });

    });

    loader.load("./GLTFs/sceneLevelTwo/papel/scene.gltf", function(gltf) {
        scene.add(gltf.scene);
        papelScene = gltf.scene
        papel = gltf.scene.children[0];
        papel.position.set(17.510, 2.110, -9.370);
        papel.rotation.set(-4.659, -Math.PI, 0.000);
        papel.scale.set(0.010, 0.010, 0.030)
        gltf.scene.position.set(-5.390, 0, 0);

        domEvents.addEventListener(papel, 'click', event => {
            console.log("Papel foi encontrada!");
            scene.remove(papelScene)
            textoObjectoPerdido5CheckMesh.visible = true
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