//
// 応用プログラミング 第6回 課題1 (ap0601)
// G184002021 拓殖太郎
//
"use strict"; // 厳格モード

import * as THREE from 'three';
import GUI from 'gui';

// ３Ｄページ作成関数の定義
function init() {
  const controls = {
    fov: 50, // 視野角
    hight: 3,
    rotation: 2,
    axes: true
  };

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    controls.fov, window.innerWidth/window.innerHeight, 0.1, 1000);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x406080 );
  renderer.shadowMap.enabled = true;
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);
  
   // テクスチャの読み込み
   const textureLoader = new THREE.TextureLoader();
   const texture = textureLoader.load("logo.png");
   const venderTexture01 = textureLoader.load("vender01.jpg");
   const venderTexture02 = textureLoader.load("vender02.jpg");
  
   // 立方体の作成
   const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
   const cubeMaterial = new THREE.MeshLambertMaterial();
   // マテリアルにテクスチャを登録
   cubeMaterial.map = texture;
   const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
   cube.position.y = 2;
   cube.position.x = -3;
   cube.castShadow = true;
   scene.add(cube);

   const venderMaterial = new THREE.MeshPhongMaterial({color: 0xE8E7E5 });
   const vender01Material = new THREE.MeshPhongMaterial({map: venderTexture01});
   const vender02Material = new THREE.MeshPhongMaterial({map: venderTexture02});
   
   const vender01 = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.8, 0.9),
    [
      venderMaterial, // 左
      venderMaterial, // 右
      venderMaterial, // 上
      venderMaterial, // 下
      vender01Material, // 前
      venderMaterial, // 後
    ]
   )
   vender01.castShadow = true;
   vender01.receiveShadow = true;
   vender01.position.y = vender01.geometry.parameters.height/2;
   vender01.position.x = -vender01.geometry.parameters.width/2;
   scene.add(vender01);
 
   const vender02 = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 1.8, 0.9),
    [
      venderMaterial, // 左
      venderMaterial, // 右
      venderMaterial, // 上
      venderMaterial, // 下
      vender02Material, // 前
      venderMaterial, // 後
    ]
   )
   vender02.castShadow = true;
   vender02.receiveShadow = true;
   vender02.position.y = vender02.geometry.parameters.height/2;
   vender02.position.x = vender02.geometry.parameters.width/2;
   scene.add(vender02);

   // 球の作成
   const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);
   const sphereMaterial = new THREE.MeshPhongMaterial();
   //sphereMaterial.map = texture2;
   const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
   sphere.position.y = 2;
   sphere.position.x = 3;
   sphere.castShadow = true;
   scene.add(sphere);
 
   // 平面の作成
   const circle = new THREE.Mesh(
     new THREE.CircleGeometry(20,24),
     new THREE.MeshLambertMaterial({color:0x008010}));
   circle.rotation.x = -Math.PI/2;
   circle.receiveShadow = true;
   scene.add(circle);

  // 光源の作成
  const light = new THREE.DirectionalLight();
  light.position.set(3, 6, 8);
  light.castShadow = true;
  scene.add(light);

  // 描画関数の定義
  function render() {
    axes.visible = controls.axes;
    camera.fov = controls.fov;
    camera.position.set(7, controls.hight, 5);
    camera.lookAt(0, 1, 0);
    camera.updateProjectionMatrix();
    // 物体の回転
    cube.rotation.y += 0.01*controls.rotation;
    sphere.rotation.y += 0.01*controls.rotation;
    renderer.shadowMap.enabled = true;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // GUIコントローラ
  const gui = new GUI();
  gui.add(controls, "fov", 10, 100);
  gui.add(controls, "hight", -10, 10);
  gui.add(controls, "rotation", -10, 10);
  gui.add(controls, "axes");

  // 描画
  render();
}

// 3Dページ作成関数の呼び出し
init();
