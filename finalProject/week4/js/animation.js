"use strict";
var q=document.getElementById("view").value;
//console.log(v);
function main(q) {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }



  var program = webglUtils.createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"]);

 
  var positionLocation = gl.getAttribLocation(program, "a_position");
   var texcoordLocation = gl.getAttribLocation( program, "a_texcoord" );
    var textureLocation = gl.getUniformLocation( program, "u_texture" );
 
 var normalLocation = gl.getAttribLocation(program, "a_normal");

  // lookup uniforms
  var worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection");
  var worldInverseTransposeLocation = gl.getUniformLocation(program, "u_worldInverseTranspose");
  //var colorLocation = gl.getUniformLocation(program, "u_color");
  var shininessLocation = gl.getUniformLocation(program, "u_shininess");
  var lightWorldPositionLocation =
      gl.getUniformLocation(program, "u_lightWorldPosition");
  var viewWorldPositionLocation =
      gl.getUniformLocation(program, "u_viewWorldPosition");
  var worldLocation =
      gl.getUniformLocation(program, "u_world");

  var positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  setGeometry(gl);

 var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, texcoordBuffer );
    // Set Texcoords.
    setTexcoords( gl );




   var texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
   
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array( [0, 0, 255, 255] ) );
    // Asynchronously load an image
    let image = new Image();

    image.src = "http://www.cs.uml.edu/~ymeng1/427546s2018/finalProject/week3/img/myHouse.png";//"img/CASTLE_TEXTURE.png";
    image.addEventListener( 'load', function () {
       
        texture.flipY = false;
        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
         drawScene();
    } );








  // var colorBuffer = gl.createBuffer();
 
  // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  // // Put geometry data into buffer
  
  var normalBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = normalBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  // Put normals data into buffer
  setNormals(gl);

  function radToDeg(r) {
    return r * 180 / Math.PI;
  }

  function degToRad(d) {
    return d * Math.PI / 180;
  }
var rotation = [degToRad(0), degToRad(0), degToRad(0)];
  var translation = [0, 0, 0];
  //console.log(v);
  if(q=="1"){

    translation = [0, 115, 400];
   //console.log("111");
  }
  if(q=='2'){
 rotation = [degToRad(0), degToRad(60), degToRad(0)];
 translation = [0, 236, 236];
  }

  if(q=='3'){
 rotation = [degToRad(0), degToRad(60), degToRad(0)];
  translation = [0, 0, 300];
  }


  //var rotation = [degToRad(0), degToRad(0), degToRad(0)];
  var scale = [1, 1, 1];
  var shear=[0,0];
  var fRotationRadians = 0;
    //var fudgeFactor = 0.2;
    var cameraAngleRadians = degToRad(0);
     var fieldOfViewRadians = degToRad(60);
  //drawScene();
  var shininess = 150;
    var rotationSpeed = 1.2;
  // Setup a ui.
  webglLessonsUI.setupSlider("#x", {value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
  webglLessonsUI.setupSlider("#y", {value: translation[1], slide: updatePosition(1), max: gl.canvas.height});
  webglLessonsUI.setupSlider("#z", {value: translation[2], slide: updatePosition(2), max: gl.canvas.height});
  webglLessonsUI.setupSlider("#angleX", {value: radToDeg(rotation[0]), slide: updateRotation(0), max: 360});
  webglLessonsUI.setupSlider("#angleY", {value: radToDeg(rotation[1]), slide: updateRotation(1), max: 360});
  webglLessonsUI.setupSlider("#angleZ", {value: radToDeg(rotation[2]), slide: updateRotation(2), max: 360});
  webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#scaleZ", {value: scale[2], slide: updateScale(2), min: -5, max: 5, step: 0.01, precision: 2});


   webglLessonsUI.setupSlider("#shearX", {value: shear[0], slide: updateshear(0), min: 0, max: 5, step: 0.01, precision: 2});
  webglLessonsUI.setupSlider("#shearY", {value: shear[1], slide: updateshear(1), min: 0, max: 5, step: 0.01, precision: 2});
 //webglLessonsUI.setupSlider("#fudgeFactor", {value: fudgeFactor, slide: updateFudgeFactor, max: 2, step: 0.001, precision: 3 });
  webglLessonsUI.setupSlider("#fieldOfView", {value: radToDeg(fieldOfViewRadians), slide: updateFieldOfView, min: 1, max: 179});
  webglLessonsUI.setupSlider("#cameraAngle", {value: radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: -360, max: 360});
   webglLessonsUI.setupSlider("#fRotation", {value: radToDeg(fRotationRadians), slide: updateRotationf, min: -360, max: 360});
  webglLessonsUI.setupSlider("#shininess", {value: shininess, slide: updateShininess, min: 1, max: 300});


    function updateShininess(event, ui) {
    shininess = ui.value;
    drawScene();
  }

 function updateRotationf(event, ui) {
    fRotationRadians = degToRad(ui.value);
    drawScene();
  }

 //webglLessonsUI.setupSlider("#shininess", {value: shininess, slide: updateShininess, min: 1, max: 300});


   function updateShininess(event, ui) {
    shininess = ui.value;
    drawScene();
  }

  function updateCameraAngle(event, ui) {
       //translation = [300, 300, 0];
    cameraAngleRadians = degToRad(ui.value);
    drawScene();

  }

  function updateFieldOfView(event, ui) {
    fieldOfViewRadians = degToRad(ui.value);
    drawScene();
  }


  function updateshear(index){
    return function(event,ui){
        shear[index] = ui.value;

        drawScene();

    }

  }

  function updatePosition(index) {
    return function(event, ui) {
      translation[index] = ui.value;
      drawScene();
    }
  }

  function updateRotation(index) {
    return function(event, ui) {
      var angleInDegrees = ui.value;
      var angleInRadians = angleInDegrees * Math.PI / 180;
      rotation[index] = angleInRadians;
      drawScene();
    }
  }

  function updateScale(index) {
    return function(event, ui) {
      scale[index] = ui.value;
      drawScene();
    }
  }

  // Draw the scene.
  function drawScene() {
      rotation[0] += rotationSpeed / 60.0; 
      //rotation[1] += rotationSpeed / 60.0; 
     rotation[2] += rotationSpeed / 60.0; 
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

   
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

   
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Turn on culling. By default backfacing triangles
    // will be culled.
    gl.enable(gl.CULL_FACE);


    gl.enable(gl.DEPTH_TEST);

   
    gl.useProgram(program);

    // Turn on the position attribute
    gl.enableVertexAttribArray(positionLocation);


    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   
    var normalize = false; 
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        
    gl.vertexAttribPointer(
        positionLocation, size, type, normalize, stride, offset)

    
    gl.enableVertexAttribArray(texcoordLocation);

    // Bind the color buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

    
    var size = 2;                 // 3 components per iteration
    var type = gl.FLOAT;  
    var normalize = false;         // normalize the data (convert from 0-255 to 0-1)
    var stride = 0;               
    var offset = 0;               // start at the beginning of the buffer
    gl.vertexAttribPointer(
        texcoordLocation, size, type, normalize, stride, offset)

   
 gl.enableVertexAttribArray(normalLocation);

    // Bind the normal buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    // Tell the attribute how to get data out of normalBuffer (ARRAY_BUFFER)
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floating point values
    var normalize = false; // normalize the data (convert from 0-255 to 0-1)
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        normalLocation, size, type, normalize, stride, offset)


 
 // var radius = 405;


  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var zNear = 1;
    var zFar = 2000;


    var camera = [0, 300, 1000];
    var target = [0, 35, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(camera, target, up);
    var viewMatrix = m4.inverse(cameraMatrix);

 var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);

   

 var worldMatrix = m4.yRotation(rotation[1]);
 var worldMatrix0 = m4.xRotation(rotation[0]);
 var worldMatrix2 = m4.zRotation(rotation[2]);
 worldMatrix = m4.multiply(worldMatrix, worldMatrix0); 
  worldMatrix = m4.multiply(worldMatrix, worldMatrix2); 


 //matrix=m4.multiply(matrix, worldMatrix );


  var  cameraMatrix2 = m4.yRotation(cameraAngleRadians);
    cameraMatrix2 = m4.translate(cameraMatrix2, 0, 0, 100);
    var viewMatrix2 = m4.inverse(cameraMatrix2);
   viewMatrix = m4.multiply(viewMatrix, viewMatrix2);
   worldMatrix = m4.multiply(worldMatrix, cameraMatrix2);  


   
    


  var worldInverseMatrix = m4.inverse(worldMatrix);
  var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);
 

     



    var matrix = m4.multiply(projectionMatrix, viewMatrix);
    matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = m4.xRotate(matrix, rotation[0]);
    matrix = m4.yRotate(matrix, rotation[1]);
    matrix = m4.zRotate(matrix, rotation[2]);
    matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);
    matrix = m4.shear(matrix,shear[0],shear[1]);


    gl.uniformMatrix4fv(worldViewProjectionLocation, false, matrix);
    gl.uniform1i( textureLocation, 0 );
    gl.uniformMatrix4fv(worldLocation, false, worldMatrix);
    gl.uniformMatrix4fv(worldInverseTransposeLocation, false, worldInverseTransposeMatrix);
    gl.uniform3fv(lightWorldPositionLocation, [100, 0, 400]);
    gl.uniform3fv(viewWorldPositionLocation, camera);
    gl.uniform1f(shininessLocation, shininess);
  
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6 * 6;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(drawScene);
  }
}

var m4 = {

lookAt: function(cameraPosition, target, up, dst) {
    dst = dst || new Float32Array(16);
    var zAxis = normalize(
        subtractVectors(cameraPosition, target));
    var xAxis = normalize(cross(up, zAxis));
    var yAxis = normalize(cross(zAxis, xAxis));

    dst[ 0] = xAxis[0];
    dst[ 1] = xAxis[1];
    dst[ 2] = xAxis[2];
    dst[ 3] = 0;
    dst[ 4] = yAxis[0];
    dst[ 5] = yAxis[1];
    dst[ 6] = yAxis[2];
    dst[ 7] = 0;
    dst[ 8] = zAxis[0];
    dst[ 9] = zAxis[1];
    dst[10] = zAxis[2];
    dst[11] = 0;
    dst[12] = cameraPosition[0];
    dst[13] = cameraPosition[1];
    dst[14] = cameraPosition[2];
    dst[15] = 1;

    return dst;
  },

    perspective: function(fieldOfViewInRadians, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);

    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  },

  projection: function(width, height, depth) {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return [
       2 / width, 0, 0, 0,
       0, -2 / height, 0, 0,
       0, 0, 2 / depth, 0,
      -1, 1, 0, 1,
    ];
  },

  multiply: function(a, b) {
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  },

  translation: function(tx, ty, tz) {
    return [
       1,  0,  0,  0,
       0,  1,  0,  0,
       0,  0,  1,  0,
       tx, ty, tz, 1,
    ];
  },

  xRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ];
  },

  yRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ];
  },

  zRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
       c, s, 0, 0,
      -s, c, 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1,
    ];
  },

  scaling: function(sx, sy, sz) {
    return [
      sx, 0,  0,  0,
      0, sy,  0,  0,
      0,  0, sz,  0,
      0,  0,  0,  1,
    ];
  },

shearing:function(shx,shy){

      return [
      1, shy,  0,  0,
      shx, 1,  0,  0,
      0,  0, 1,  0,
      0,  0,  0,  1,
    ];

},

  translate: function(m, tx, ty, tz) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },

  xRotate: function(m, angleInRadians) {
      

    return m4.multiply(m, m4.xRotation(angleInRadians));
  },

  yRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.yRotation(angleInRadians));
  },

  zRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.zRotation(angleInRadians));
  },

 normalize: function(v, dst) {
    dst = dst || new Float32Array(3);
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    // make sure we don't divide by 0.
    if (length > 0.00001) {
      dst[0] = v[0] / length;
      dst[1] = v[1] / length;
      dst[2] = v[2] / length;
    }
    return dst;
  },

   transpose:function(m, dst) {
    dst = dst || new Float32Array(16);

    dst[ 0] = m[0];
    dst[ 1] = m[4];
    dst[ 2] = m[8];
    dst[ 3] = m[12];
    dst[ 4] = m[1];
    dst[ 5] = m[5];
    dst[ 6] = m[9];
    dst[ 7] = m[13];
    dst[ 8] = m[2];
    dst[ 9] = m[6];
    dst[10] = m[10];
    dst[11] = m[14];
    dst[12] = m[3];
    dst[13] = m[7];
    dst[14] = m[11];
    dst[15] = m[15];

    return dst;
  },

  scale: function(m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },

  shear: function(m,shx,shy){
     return m4.multiply(m, m4.shearing(shx, shy));
  },

    inverse: function(m) {
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0  = m22 * m33;
    var tmp_1  = m32 * m23;
    var tmp_2  = m12 * m33;
    var tmp_3  = m32 * m13;
    var tmp_4  = m12 * m23;
    var tmp_5  = m22 * m13;
    var tmp_6  = m02 * m33;
    var tmp_7  = m32 * m03;
    var tmp_8  = m02 * m23;
    var tmp_9  = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;

    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    return [
      d * t0,
      d * t1,
      d * t2,
      d * t3,
      d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
            (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
      d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
            (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
      d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
            (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
      d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
            (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
      d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
            (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
      d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
      d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
            (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
      d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
            (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
      d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
            (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
      d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
      d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
            (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
      d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
            (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
    ];
  },

  vectorMultiply: function(v, m) {
    var dst = [];
    for (var i = 0; i < 4; ++i) {
      dst[i] = 0.0;
      for (var j = 0; j < 4; ++j)
        dst[i] += v[j] * m[j * 4 + i];
    }
    return dst;
  },
};

  function cross(a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = a[2] * b[0] - a[0] * b[2];
    dst[2] = a[0] * b[1] - a[1] * b[0];
    return dst;
  }


  function subtractVectors(a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    return dst;
  }
  function normalize(v, dst) {
    dst = dst || new Float32Array(3);
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    // make sure we don't divide by 0.
    if (length > 0.00001) {
      dst[0] = v[0] / length;
      dst[1] = v[1] / length;
      dst[2] = v[2] / length;
    }
    return dst;
  }
// Fill the buffer with the values that define a letter 'F'.
function setGeometry(gl) {
  let side_len = 300;
 var positions = new Float32Array([
            // front face
        0, 0, 0,
        0, side_len, 0,
        side_len, 0, 0,

        side_len, 0, 0,
        0, side_len, 0,
        side_len, side_len, 0,


        // top face
        0, 0, 0,
        side_len, 0, 0,
        side_len, 0, side_len,

        side_len, 0, side_len,
        0, 0, side_len,
        0, 0, 0,


        // LEFT face
        0, 0, 0,
        0, 0, side_len,
        0, side_len, side_len,

        0, 0, 0,
        0, side_len, side_len,
        0, side_len, 0,

        //RIGHT face
        side_len, 0, 0,
        side_len, side_len, side_len,
        side_len, 0, side_len,

        side_len, 0, 0,
        side_len, side_len, 0,
        side_len, side_len, side_len,

        // back face
        0, 0, side_len,
        side_len, 0, side_len,
        side_len, side_len, side_len,

        0, 0, side_len,
        side_len, side_len, side_len,
        0, side_len, side_len,

        // BOTTOM face
        0, side_len, 0,
        side_len, side_len, side_len,
        side_len, side_len, 0,

        0, side_len, 0,
        0, side_len, side_len,
        side_len, side_len, side_len,
          ]);

   // var matrix = m4.xRotation(Math.PI),
 // matrix = m4.translate(matrix, -50, -75, -15);
 var pmatrix = m4.translation(-100, -100,-100);
 //matrix = m4.translate(matrix, -50, -75, -15);
  //matrix = m4.multiply(matrix, moveOriginMatrix);
 var matrix = m4.xRotation(Math.PI);
matrix =m4.multiply(matrix, pmatrix);
  for (var ii = 0; ii < positions.length; ii += 3) {
    var vector = m4.vectorMultiply([positions[ii + 0], positions[ii + 1], positions[ii + 2], 1], matrix);
    positions[ii + 0] = vector[0];
    positions[ii + 1] = vector[1];
    positions[ii + 2] = vector[2];
  }

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

}
// Fill the buffer with colors for the 'F'

function setTexcoords( gl ) {
    const W = 764;
    const H = 493;

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array( [


            //0 / W, 395 / H,
            //100 / W, 495 / H,
            //100 / W, 395 / H,
            // FRONT X/W  Y/H


           // 0 / W, 495 / H,
            //0 / W, 395/ H,
            //100 / W, 495 / H,


           // 100/ W, 395 / H,
            //0 / W, 395 / H,
            //100 / W, 495 / H,

              
            0 / W, 472 / H,
             0 / W, 240 / H,
            302 / W, 472 / H,
          
             
            302 / W, 472 / H,
            0 / W, 240 / H,
            
            302 / W, 240 / H,




            // TOP FACE
           

            0 / W, 0 / H,
            0 / W, 240 / H,
           
            304 / W, 240 / H,
             304 / W, 240 / H,
            304 / W, 0 / H,
            0 / W, 0 / H,


            // LEFT
           
            
              578 / W, 472 / H,
            304 / W, 472 / H,
           304 / W, 240 / H,
           
            
            
            578 / W, 472 / H,
            304 / W, 240 / H,
578 / W, 240 / H,
            // right

            578 / W, 472 / H,
            304 / W, 240 / H,
            304 / W, 472 / H,
            
            
            578 / W, 472 / H,
            578 / W, 240 / H,
            
            304 / W, 240 / H,
            
            

            

            //  back
578 / W, 472 / H,
            304 / W, 472 / H,
            
            304 / W, 240 / H,

           578 / W, 472 / H,
            304 / W, 240 / H,
             578 / W, 240 / H,
           


            // bottom

            578 / W, 240 / H,
            304 / W, 0 / H,
             578 / W, 0 / H,
          
            304 / W, 0 / H,
            304 / W, 240 / H,
            578 / W, 240 / H,       



        ] ),
        gl.STATIC_DRAW );
}

function setNormals(gl) {
  var normals = new Float32Array([
          // left column front
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,

        // top
          0, 1, 0,
          0, 1, 0,
          0, 1, 0,
          0, 1, 0,
          0, 1, 0,
          0, 1, 0,

           // left side
          -1, 0, 0,
          -1, 0, 0,
          -1, 0, 0,
          -1, 0, 0,
          -1, 0, 0,
          -1, 0, 0,


           1, 0, 0,
          1, 0, 0,
          1, 0, 0,
          1, 0, 0,
          1, 0, 0,
          1, 0, 0,

       // top rung back
          0, 0, -1,
          0, 0, -1,
          0, 0, -1,
          0, 0, -1,
          0, 0, -1,
          0, 0, -1,



            0, -1, 0,
          0, -1, 0,
          0, -1, 0,
          0, -1, 0,
          0, -1, 0,
          0, -1, 0,












         ]);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
}

main(q);
