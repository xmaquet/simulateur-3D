import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ObjectViewer = ({ modelType }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  let selectedObject = null; // Déclaration globale pour `handleFileUpload`
  let previousObject = null;

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      setUploadedImage(e.target.result); // Stocker l'image pour affichage

      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, 0);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        texture.transparent = true;
        texture.format = THREE.RGBAFormat;

        if (selectedObject && selectedObject.geometry.attributes.uv) {
          const uvArray = selectedObject.geometry.attributes.uv.array;
          const uvBox = new THREE.Box2();

          for (let i = 0; i < uvArray.length; i += 2) {
            uvBox.expandByPoint(new THREE.Vector2(uvArray[i], uvArray[i + 1]));
          }

          texture.offset.set(uvBox.min.x, uvBox.min.y);
          texture.repeat.set(1 / (uvBox.max.x - uvBox.min.x), 1 / (uvBox.max.y - uvBox.min.y));
        }

        if (selectedObject) {
          selectedObject.material.map = texture;
          selectedObject.material.transparent = true;
          selectedObject.material.opacity = 1;
          selectedObject.material.needsUpdate = true;

          console.log("Texture appliquée à :", selectedObject.name);
        } else {
          console.warn("Aucun objet sélectionné pour appliquer la texture.");
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function fillSelectedObject(color) {
    if (previousObject) {
      previousObject.material.color.set(0xffffff);
      previousObject.material.transparent = true;
      previousObject.material.opacity = 0;
    }

    if (selectedObject) {
      selectedObject.material.color.set(color);
      selectedObject.material.transparent = false;
      selectedObject.material.opacity = 1;
      previousObject = selectedObject;
    }
  }

  useEffect(() => {
    let scene, camera, renderer, mug;
    let controls;

    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 1, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("canvas-container").appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight1.position.set(1, 1, 1).normalize();
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
      directionalLight2.position.set(-1, -1, -1).normalize();
      scene.add(directionalLight2);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = false;

      loadModel(`/static/models/${modelType}.glb`);
      animate();
    }

    function loadModel(url) {
      const loader = new GLTFLoader();
      loader.load(url, function (gltf) {
        mug = gltf.scene;
        scene.add(mug);

        let objectInfo = '<b>Sur quelle zone voulez-vous marquer votre objet ?</b><br>';

        mug.traverse(function (child) {
          if (child.isMesh) {
            if (child.name !== "scene" && child.name !== "objet") {
              child.material.transparent = true;
              child.material.opacity = 0;
            }

            let uvInfo = "";
            if (child.geometry.attributes.uv) {
              uvInfo = ` (UV Count: ${child.geometry.attributes.uv.count})`;
            }

            if (child.name !== "objet") {
              objectInfo += `<input type="radio" name="object" value="${child.uuid}"> ${child.name || "(sans nom)"}${uvInfo}<br>`;
            }
          }
        });

        const objectInfoElement = document.getElementById("objectInfo");
        objectInfoElement.innerHTML = objectInfo;

        const radios = document.getElementsByName("object");
        radios.forEach((radio) => {
          radio.addEventListener("change", function () {
            selectedObject = mug.getObjectByProperty("uuid", this.value);

            const fileInput = document.getElementById("fileInput");
            if (fileInput) {
              fileInput.disabled = !selectedObject;
            }

            fillSelectedObject(0xadd8e6); // Appliquer la couleur bleu pâle à la zone sélectionnée
          });
        });

        const box = new THREE.Box3().setFromObject(mug);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        controls.target.copy(center);
        controls.update();

        camera.position.copy(center).add(new THREE.Vector3(0, 0, size * 1.1));
        camera.lookAt(center);
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    init();

    return () => {
      document.getElementById("canvas-container").innerHTML = "";
    };
  }, [modelType]);

  return (
    <>
      <div id="objectInfo" style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "rgba(255,255,255,0.8)", padding: "10px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}></div>
      <div id="canvas-container" style={{ width: "100%", height: "100vh" }}></div>
      <input
        type="file"
        id="fileInput"
        style={{ position: "absolute", top: "10px", left: "10px" }}
        disabled
        onChange={handleFileUpload}
      />
      {uploadedImage && (
        <img
          src={uploadedImage}
          alt="Prévisualisation"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            width: "400px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      )}
    </>
  );
};

export default ObjectViewer;
