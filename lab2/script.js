import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const loader = new OBJLoader();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight)

const pointLight1 = new THREE.PointLight(0xffffff, 6, 8);
pointLight1.position.set(0, 3, 0);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 6, 8);
pointLight2.position.set(-3, 3, 0);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 6, 8);
pointLight3.position.set(3, 3, 0);
scene.add(pointLight3);

var floorMaterial= new THREE.MeshStandardMaterial;
var ceilingMaterial, wallMaterial;

function getMaterials(){
    var floorAO, floorBase, floorHeight, floorNormal, floorRoughness;
    floorAO = new THREE.TextureLoader().load('materials/floor/Tiles_016_ambientOcclusion.jpg' ); 
    floorBase = new THREE.TextureLoader().load('materials/floor/Tiles_016_basecolor.jpg' ); 
    floorHeight =  new THREE.TextureLoader().load('materials/floor/Tiles_016_height.png' ); 
    floorNormal = new THREE.TextureLoader().load('materials/floor/Tiles_016_normal.jpg' ); 
    floorRoughness = new THREE.TextureLoader().load('materials/floor/Tiles_016_roughness.jpg' );

    floorAO.wrapS = THREE.RepeatWrapping;
    floorAO.wrapT = THREE.RepeatWrapping;
    floorAO.repeat.set(2,1);

    floorBase.wrapS = THREE.RepeatWrapping;
    floorBase.wrapT = THREE.RepeatWrapping;
    floorBase.repeat.set(2,1);

    floorHeight.wrapS = THREE.RepeatWrapping;
    floorHeight.wrapT = THREE.RepeatWrapping;
    floorHeight.repeat.set(2,1);
    
    floorNormal.wrapS = THREE.RepeatWrapping;
    floorNormal.wrapT = THREE.RepeatWrapping;
    floorNormal.repeat.set(2,1);

    floorRoughness.wrapS = THREE.RepeatWrapping;
    floorRoughness.wrapT = THREE.RepeatWrapping;
    floorRoughness.repeat.set(2,1);

    floorMaterial = new THREE.MeshStandardMaterial( 
        { map:floorBase,
            roughnessMap: floorRoughness,
            normalMap: floorNormal,
            aoMap:floorAO,
            bumpMap: floorHeight
          
          } );

    


    var ceilingAO, ceilingBase, ceilingHeight, ceilingNormal, ceilingRoughness;
    ceilingAO = new THREE.TextureLoader().load('materials/ceiling/Ceiling_Drop_Tiles_001_ambientOcclusion.jpg' ); 
    ceilingBase = new THREE.TextureLoader().load('materials/ceiling/Ceiling_Drop_Tiles_001_basecolor.jpg' ); 
    ceilingHeight =  new THREE.TextureLoader().load('materials/ceiling/Ceiling_Drop_Tiles_001_height.png' ); 
    ceilingNormal = new THREE.TextureLoader().load('materials/ceiling/Ceiling_Drop_Tiles_001_normal.jpg' ); 
    ceilingRoughness = new THREE.TextureLoader().load('materials/ceiling/Ceiling_Drop_Tiles_001_roughness.jpg' );

    ceilingAO.wrapS = THREE.RepeatWrapping;
    ceilingAO.wrapT = THREE.RepeatWrapping;
    ceilingAO.repeat.set(2,1);

    ceilingBase.wrapS = THREE.RepeatWrapping;
    ceilingBase.wrapT = THREE.RepeatWrapping;
    ceilingBase.repeat.set(2,1);

    ceilingHeight.wrapS = THREE.RepeatWrapping;
    ceilingHeight.wrapT = THREE.RepeatWrapping;
    ceilingHeight.repeat.set(2,1);
    
    ceilingNormal.wrapS = THREE.RepeatWrapping;
    ceilingNormal.wrapT = THREE.RepeatWrapping;
    ceilingNormal.repeat.set(2,1);

    ceilingRoughness.wrapS = THREE.RepeatWrapping;
    ceilingRoughness.wrapT = THREE.RepeatWrapping;
    ceilingRoughness.repeat.set(2,1);

    ceilingMaterial = new THREE.MeshStandardMaterial( 
        { map:ceilingBase,
            roughnessMap: ceilingRoughness,
            normalMap: ceilingNormal,
            aoMap:ceilingAO,
            bumpMap: ceilingHeight
          } );

          var wallAO, wallBase, wallHeight, wallNormal, wallRoughness;
          wallAO = new THREE.TextureLoader().load('materials/wall/Wallpaper_Glassweave_001_ambientOcclusion.jpg' ); 
          wallBase = new THREE.TextureLoader().load('materials/wall/Wallpaper_Glassweave_001_basecolor.jpg' ); 
          wallHeight =  new THREE.TextureLoader().load('materials/wall/Wallpaper_Glassweave_001_height.png' ); 
          wallNormal = new THREE.TextureLoader().load('materials/wall/Wallpaper_Glassweave_001_normal.jpg' ); 
          wallRoughness = new THREE.TextureLoader().load('materials/wall/Wallpaper_Glassweave_001_roughness.jpg' );
            
          wallMaterial = new THREE.MeshStandardMaterial( 
              { map:wallBase,
                roughnessMap: wallRoughness,
                normalMap: wallNormal,
                aoMap:wallAO,
                bumpMap: wallHeight
              } );

}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

camera.position.z = 7;

getMaterials();

loader.load( 'models/officechair/officechair.obj',
    function ( object ) {

        var chairGeom = object.children[0].geometry;

        var chairTexture = new THREE.TextureLoader().load('models/officechair/officechair_d.jpg')
  
        chairTexture.wrapS = THREE.RepeatWrapping;

        var chairMaterial = new THREE.MeshStandardMaterial( 
          { map:chairTexture,} );

        var chairObj = new THREE.Mesh(chairGeom, chairMaterial);
        chairObj.material.side = THREE.DoubleSide;

        chairObj.position.x = 2.5;
        chairObj.position.y = 0;
        chairObj.position.z = -4;

        chairObj.rotateX(0);
        chairObj.rotateY(-51);
        chairObj.rotateZ(0);

        chairObj.scale.set(0.015,0.015,0.015);
        chairObj.material.side = THREE.DoubleSide;
        scene.add( chairObj);
 }, undefined, function ( error ) {
 
   console.error( error );
 
 } );

 loader.load( 'models/door/door.obj',
  function ( object ) {

      var doorGeom = object.children[0].geometry;
      var doorTexture = new THREE.TextureLoader().load('models/door/door_d.jpg')

      doorTexture.wrapS = THREE.RepeatWrapping;

      var doorMaterial = new THREE.MeshStandardMaterial( 
        { map:doorTexture,} );

      var doorObj = new THREE.Mesh(doorGeom, doorMaterial);
      doorObj.material.side = THREE.DoubleSide;

      doorObj.rotation.set(0,0,-3.14159);
      doorObj.position.x = 0;
      doorObj.position.y = 0;
      doorObj.position.z = 2.07;
      doorObj.scale.set(-0.001,-0.001,-0.001);


      scene.add( doorObj);
}, undefined, function ( error ) {

 console.error( error );

} );

loader.load( 'models/window/window.obj',
  function ( object ) {

      var windowGeom = object.children[0].geometry;
      var windowTexture = new THREE.TextureLoader().load('models/window/window_d.jpg')

      windowTexture.wrapS = THREE.RepeatWrapping;

      var windowMaterial = new THREE.MeshStandardMaterial( 
        { map:windowTexture,} );

      var windowObj = new THREE.Mesh(windowGeom, windowMaterial);
      windowObj.material.side = THREE.DoubleSide;

      windowObj.rotation.set(0,1.5708,0);
      windowObj.position.x = 1.75;
      windowObj.position.y = 1;
      windowObj.position.z = 1.5;
      windowObj.scale.set(0.001,0.001,0.001);


      scene.add( windowObj);
}, undefined, function ( error ) {

 console.error( error );

} );

loader.load( 'models/table/table_microlift.obj',
  function ( object ) {
      
      var tableOBJECT = new THREE.Mesh(new THREE.BoxGeometry(0,0,0,0));

      var tableTextures = [
        new THREE.TextureLoader().load('models/table/table2_d.jpg'),
        new THREE.TextureLoader().load('models/table/table2_d.jpg'),
        new THREE.TextureLoader().load('models/table/table2_d.jpg'),
      ]
      
      tableTextures[0].wrapS = THREE.RepeatWrapping;
      tableTextures[0].wrapT = THREE.RepeatWrapping;
      tableTextures[0].repeat.set( -0.5, 5 );

      tableTextures[1].wrapS = THREE.RepeatWrapping;
      tableTextures[1].wrapT = THREE.RepeatWrapping;
      tableTextures[1].repeat.set( 0.5, -0.5 );

      tableTextures[2].wrapS = THREE.RepeatWrapping;
      tableTextures[2].wrapT = THREE.RepeatWrapping;
      tableTextures[2].repeat.set( 0.5, 0.5 );

      var tableMaterials = [
        new THREE.MeshStandardMaterial( { map:tableTextures[0]} ),
        new THREE.MeshStandardMaterial( { map:tableTextures[1]} ),
        new THREE.MeshStandardMaterial( { map:tableTextures[2]} )
      ]

      tableOBJECT.add(
        new THREE.Mesh(object.children[0].geometry, tableMaterials[0]),
        new THREE.Mesh(object.children[1].geometry, tableMaterials[0]),
        new THREE.Mesh(object.children[2].geometry, tableMaterials[1]),
        new THREE.Mesh(object.children[3].geometry, tableMaterials[2]),
        new THREE.Mesh(object.children[4].geometry, tableMaterials[2]),
        new THREE.Mesh(object.children[5].geometry, tableMaterials[2]),
        new THREE.Mesh(object.children[6].geometry, tableMaterials[1]),
        new THREE.Mesh(object.children[7].geometry, tableMaterials[2]),
      
      )

      tableOBJECT.position.x = 3.25;
      tableOBJECT.position.y = 0.005;
      tableOBJECT.position.z = -1.5;

      tableOBJECT.rotateX(0);
      tableOBJECT.rotateY(-51);
      tableOBJECT.rotateZ(0);

      tableOBJECT.scale.set(0.012,0.012,0.012);
      //tableOBJECT.scale.set(0.02,0.02,0.02);

      tableOBJECT.material.side = THREE.DoubleSide;
      scene.add( tableOBJECT);
}, undefined, function ( error ) {

 console.error( error );

} );

loader.load( 'models/roommodel2.obj',
    function ( object ) {
    
        var floorGeom = object.children[0].geometry;
        var floorObj = new THREE.Mesh(floorGeom, floorMaterial);

        floorObj.material.side = THREE.DoubleSide;
        scene.add( floorObj);

        var firstWallGeom = object.children[1].geometry;
        var firstWallObj = new THREE.Mesh(firstWallGeom, wallMaterial);
        firstWallObj.material.side = THREE.DoubleSide;
        scene.add(firstWallObj);

        var secondWallGeom = object.children[2].geometry;
        var secondWallObj = new THREE.Mesh(secondWallGeom, wallMaterial);
        secondWallObj.material.side = THREE.DoubleSide;
        scene.add(secondWallObj);

        var thirdWallGeom = object.children[3].geometry;
        var thirdWallObj = new THREE.Mesh(thirdWallGeom, wallMaterial);
        thirdWallObj.material.side = THREE.DoubleSide;
        scene.add(thirdWallObj);

        var fourthWallGeom = object.children[4].geometry;
        var fourthWallObj = new THREE.Mesh(fourthWallGeom, wallMaterial);
        fourthWallObj.material.side = THREE.DoubleSide;
        scene.add(fourthWallObj);

        var cGeom = object.children[5].geometry;
        var cObj = new THREE.Mesh(cGeom, ceilingMaterial);
        cObj.material.side = THREE.DoubleSide;
        scene.add(cObj);

 }, undefined, function ( error ) {
 
   console.error( error );
 
 } );


function animate() {

    renderer.render( scene, camera );
    controls.update();
}

window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
});

