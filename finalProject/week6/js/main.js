$( "document" ).ready( ( evt ) => {
    "use strict";


    class Matrix3D {
        /**
         *
         * @param src optional array or Matrix3D source
         */
        constructor( src ) {

            this.transformOrigin = this.identity();
            this.m = Array.isArray( src ) ? src : src instanceof Matrix3D ? src.m : this.identity();


        }

        /**
         * set the transformation origin
         * @param origin
         */
        setOrigin( origin ) {
            this.transformOrigin = this.translation( origin.x, origin.y, origin.z );
            return this;
        }

        static createMatrixAsArray( origin ) {
            return origin ? math4d.translation( origin.x, origin.y, origin.z ) : math4d.identity();

        }

        /**
         * get the Matrix3D object as a plain flattened 4x4 javascript array
         * @returns {*}
         */
        getMatrixAsArray() {
            return this.m;
        }

        /**
         * multiplies the LHS by RHS, mutates LHS and returns LHS's this reference for chaining
         * @param RHSmatrix Matrix3D object or plain flattened 4x4 javascript array
         * @returns {Matrix3D}
         */
        multiply( RHSmatrix ) {
            this.m = math4d.multiply( this.m, RHSmatrix instanceof Matrix3D ? RHSmatrix.m : RHSmatrix );
            return this;
        }


        inverse() {
            this.m = math4d.inverse( this.m );
            return this;
        }


        /**
         * rotates about X,Y,Z axis by Xangle,Yangle, and Zangle respectively
         * about the objects origin
         *
         * @param Xangle radians
         * @param Yangle radians
         * @param Zangle radians
         */
        rotate( Xangle, Yangle, Zangle ) {
            return this.multiply( this.transformOrigin )
                .multiply( this.xRotation( Xangle * Math.PI / 180 ) )
                .multiply( this.yRotation( Yangle * Math.PI / 180 ) )
                .multiply( this.zRotation( Zangle * Math.PI / 180 ) )
                .multiply( math4d.inverse( this.transformOrigin ) );

        }

        /**
         * translates x,y,z axises
         * @param tX
         * @param tY
         * @param tZ
         * @returns {Matrix3D}
         */
        translate( tX, tY, tZ ) {
            return this.multiply( this.translation( tX, tY, tZ ) );
        }

        /**
         * scales x,y,z axises about objects origin
         * @param sX
         * @param sY
         * @param sZ
         * @returns {Matrix3D}
         */
        scale( sX, sY, sZ ) {
            return this.multiply( this.transformOrigin )
                .multiply( this.scaling( sX, sY, sZ ) )
                .multiply( math4d.inverse( this.transformOrigin ) );
        }


        /**
         *shears x,y axises about objects origin
         * @param alphaX angle to shear X
         * @param betaY angle to shear Y
         * @returns {*}
         */
        shear( alphaX, betaY ) {
            let tanA = Math.tan( alphaX * Math.PI / 180 );
            let tanB = Math.tan( betaY * Math.PI / 180 );

            let matrix = this.identity();

            matrix[4] = tanA;
            matrix[1] = tanB;

            return this.multiply( this.transformOrigin )
                .multiply( matrix )
                .multiply( math4d.inverse( this.transformOrigin ) );

        }


    }

    MAT3d = Matrix3D;

    Object.setPrototypeOf( Matrix3D.prototype, math4d );


    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById( "canvas" );
    let gl = canvas.getContext( "webgl" );
    if ( !gl ) {
        throw "BROWSER DOES NOT SUPPORT WEBGL!";
    }

    const Xindx = 0;
    const Yindx = 1;
    const Zindx = 2;

    // const left = -gl.canvas.clientWidth / 2;
    // let right = gl.canvas.clientWidth/2;
    // let bottom = gl.canvas.clientHeight/2;
    // const top = -gl.canvas.clientHeight / 2;
    // const near =- 500;
    // const far = 600;

    const left = 0;
    let right = gl.canvas.clientWidth ;
    let bottom = gl.canvas.clientHeight;
    const top = 0;
    const near = -500;
    const far = 600;


    let currTranslations = [0, 0, 0];
    let currScales = [1, 1, 1];
    let currRotations = [0, 0, 0];
    let currShears = [0, 0];


    let OBJECT_ORIGIN = { x:450, y: 350, z: 225 };

    let currTransformMatrix = new Matrix3D();

    let currModelViewMatrix = new Matrix3D();

    let currentView;

    const projectionNormalizationMatrix = new Matrix3D( math4d.orthographic( left, right, bottom, top, near, far ) );
    let currProjectionMatrix;

    let currentRotateAxis = "Xaxis";


    // setup GLSL program
    const program = webglUtils.createProgramFromScripts( gl, ["3d-vertex-shader", "3d-fragment-shader"] );

    // look up where the vertex data needs to go.
    const positionLocation = gl.getAttribLocation( program, "a_position" );

    let texcoordLocation = gl.getAttribLocation( program, "a_texcoord" );


    // lookup uniforms
    const matrixLocation = gl.getUniformLocation( program, "u_matrix" );
    const textureLocation = gl.getUniformLocation( program, "u_texture" );

    // Create a buffer to put positions in
    let positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
    // Put geometry data into buffer
    setGeometry( gl );

    let texcoordBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, texcoordBuffer );
    // Set Texcoords.
    setTexcoords( gl );


    let texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array( [0, 0, 255, 255] ) );
    // Asynchronously load an image
    let image = new Image();

    //"img/CASTLE_TEXTURE.png";
    image.src = "http://www.cs.uml.edu/~ymeng1/427546s2018/finalProject/week3/img/CASTLE_TEXTURE.png";

    image.addEventListener( 'load', function () {
        // Now that the image has loaded make copy it to the texture.
        //texture.image = image;
        texture.flipY = false;
        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
    } );


    // Draw the scene.
    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize( gl.canvas );

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
        //console.log( gl.canvas.width );
        // console.log( gl.canvas.height );

        // Clear the canvas.
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        // Turn on culling. By default backfacing triangles
        // will be culled.

        gl.enable( gl.CULL_FACE );

        // Enable the depth buffer

        gl.enable( gl.DEPTH_TEST );

        // Tell it to use our program (pair of shaders)
        gl.useProgram( program );

        // Turn on the position attribute
        gl.enableVertexAttribArray( positionLocation );

        // Bind the position buffer.
        gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        let size = 3;          // 3 components per iteration
        let type = gl.FLOAT;   // the data is 32bit floats
        let normalize = false; // don't normalize the data
        let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset );


        // Turn on the teccord attribute
        gl.enableVertexAttribArray( texcoordLocation );

        // Bind the position buffer.
        gl.bindBuffer( gl.ARRAY_BUFFER, texcoordBuffer );

        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        size = 2;          // 2 components per iteration
        type = gl.FLOAT;   // the data is 32bit floats
        normalize = false; // don't normalize the data
        stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            texcoordLocation, size, type, normalize, stride, offset );


        let modelViewMatrix = new Matrix3D( currProjectionMatrix );


        //currModelViewMatrix = projectionMatrix.multiply( currTransformMatrix );

        console.log( "transform : " + currTransformMatrix.getMatrixAsArray() );

        console.log( "modelView : " + modelViewMatrix.getMatrixAsArray() );

        let finalProjection = modelViewMatrix.multiply( currTransformMatrix ).getMatrixAsArray();

        console.log( "final: " + finalProjection );


        gl.uniformMatrix4fv( matrixLocation, false,
             finalProjection);

        gl.uniform1i( textureLocation, 0 );

        // Draw the geometry.
        const primitiveType = gl.TRIANGLES;
        offset = 0;

        //NUMBER OF FACES CHANGED HERE
        const count = 6 * 6;
        gl.drawArrays( primitiveType, offset, count );


        //requestAnimationFrame( drawScene );


    }


    $( "#reset_transformsbtn" ).click( ( evt ) => {

        // resetTransformValues();
        // combineTransformations( );
        //
        // drawScene();

        switch ( currentView ) {
            case "ORTHO":
                generateOrthographicProjectionView();
                break;
            case "AXON":
                generateAxonometricProjectionView();
                break;

            case "OBLIQ":
                generateObliqueProjectionView( 60, 67 );
                break;

            case "1VANISH":
                generatePrespectiveProjectionView( 1 );
                break;

            case "2VANISH":
                generatePrespectiveProjectionView( 2 );
                break;

            case "3VANISH":
                generatePrespectiveProjectionView( 3 );
                break;

        }


        $( "#reset_transformsbtn" ).removeClass( "show-transition" );

    } );


    function combineTransformations() {

        //NEED TO CREATE MATRIX OBJECT W/ METHODS FROM M4 object
        let matrix = new Matrix3D().setOrigin( OBJECT_ORIGIN );


        matrix.translate( ...currTranslations )
            .rotate( ...currRotations )
            .shear( ...currShears )
            .scale( ...currScales );


        currTransformMatrix = matrix;


        return matrix;


    }

    function resetTransformValues() {
        currScales[Xindx] = 1;
        currScales[Yindx] = 1;
        currScales[Zindx] = 1;

        currShears[Xindx] = 0;
        currShears[Yindx] = 0;

        currRotations[Xindx] = 0;
        currRotations[Yindx] = 0;
        currRotations[Zindx] = 0; //-180;

        currTranslations[Xindx] = 0;
        currTranslations[Yindx] = 0;
        currTranslations[Zindx] = 0;


        $( ".slider" ).each( ( indx, elem ) => {

            $( elem ).val( elem.defaultValue );
            $( elem ).siblings( ".val-box" ).html( elem.defaultValue );

        } );

        $( "#reset_transformsbtn" ).removeClass( "show-transition" );


    }


    $( ".slider" ).each( ( indx, elem ) => {

        $( elem ).attr( "step", 1 );

        let min = Number.parseFloat( $( elem ).attr( "min" ) / 0.01 );
        let max = Number.parseFloat( $( elem ).attr( "max" ) / 0.01 );
        let val = Number.parseFloat( $( elem ).attr( "value" ) / 0.01 );

        $( elem ).attr( "min", min.toPrecision( 3 ) );
        $( elem ).attr( "max", max.toPrecision( 3 ) );
        $( elem ).attr( "value", val.toPrecision( 3 ) );


    } );



    function generateOrthographicProjectionView() {

        resetTransformValues();




        currProjectionMatrix = new Matrix3D( projectionNormalizationMatrix );

        combineTransformations();


        drawScene();


    }



    function generateObliqueProjectionView( theta, phi ) {

        // 0   1   2   3
        // 4   5   6   7
        // 8   9   10  11
        // 12  13  14  15

        resetTransformValues();

        let matrix_array = Matrix3D.createMatrixAsArray();

        let cot_theta = math.cot( theta * Math.PI / 180 );
        let cot_phi = math.cot( phi * Math.PI / 180 );

        console.log( "OBLIQUE theta: " + cot_theta );
        console.log( "OBLIQUE phi: " + cot_phi );


        matrix_array[8] = cot_theta;
        matrix_array[9] = cot_phi;


        //matrix[10] = 1;
        // let ortho = new Matrix3D( math4d.orthographic( left, right, bottom, top, near, far ));
        // ortho.multiply( new Matrix3D( matrix_array ).setOrigin(OBJECT_ORIGIN));

        currProjectionMatrix = new Matrix3D( projectionNormalizationMatrix )
            .setOrigin( OBJECT_ORIGIN )
            .multiply( matrix_array ).translate(-130,0,0);              //ortho;

        combineTransformations();

        drawScene();

    }


    function generateAxonometricProjectionView() {

        resetTransformValues();

        currProjectionMatrix = new Matrix3D( projectionNormalizationMatrix );


        currRotations[Xindx] = 32;
        currRotations[Yindx] = 45;


        combineTransformations();


        drawScene();


    }

    function radToDeg( r ) {
        return r * 180 / Math.PI;
    }

    function degToRad( d ) {
        return d * Math.PI / 180;
    }

    function generatePrespectiveProjectionView( numVanishingPts ) {

        resetTransformValues();
        const near = 1;
        const far = 2000;

        let aspect = gl.canvas.width/gl.canvas.height;
        let perspectiveNormalizationMatrix1 = new Matrix3D( math4d.perspective( degToRad(45),aspect,near,far  ) )
            .setOrigin( OBJECT_ORIGIN )
            .translate( -400, -250, -900 ).rotate( 180, 0, 0 );


        let YrotMatrix = new Matrix3D().translate( 0, 0, 0 ).rotate( 0, -32, 0 );
        let YrotInvMatrix = new Matrix3D().translate( 0, 0, 0 ).rotate( 0, 32, 0 );

        let XrotMatrix = new Matrix3D().translate( 0, 0, 0 ).rotate( 0, -35, 0 );
        let XYrotInvMatrix = new Matrix3D().translate( 0, 0, 0 ).rotate( 0, 35, 0 );


        //let simple_perspective = new Matrix3D( math4d.simplePerspective() );


        switch ( numVanishingPts ) {
            case 1:

                currProjectionMatrix =perspectiveNormalizationMatrix1;

                break;
            case 2:
                let perspectiveNormalizationMatrix2 = new Matrix3D( math4d.perspective( degToRad(90 ), aspect, 100, 2000 ) )
                    .setOrigin( OBJECT_ORIGIN )
                    .translate( -400, -350, -900 ).rotate( 180, 0, 0 );



                currProjectionMatrix=YrotMatrix.
                multiply( perspectiveNormalizationMatrix2 )
                    .multiply(YrotInvMatrix).translate(0,-120,120);

                break;
            case 3:

                let perspectiveNormalizationMatrix3 = new Matrix3D( math4d.perspective( degToRad( 80 ), aspect, 150, 2000 ) )
                    .setOrigin( OBJECT_ORIGIN )
                    .translate( -400, -350, -900 ).rotate( 180, 0, 0 );



                currProjectionMatrix = XrotMatrix.multiply(YrotMatrix)
                    .multiply( perspectiveNormalizationMatrix3 )
                    .multiply( YrotInvMatrix )
                    .multiply(XYrotInvMatrix).translate(-200,-115,200);


                break;
        }


        combineTransformations();
        drawScene();


    }


    $( ".trasform_controls" ).on( "input change", ".slider", ( evt ) => {

        $( "#reset_transformsbtn" ).addClass( "show-transition" );


        let value = Number.parseFloat( $( evt.target ).val() );

        value *= 0.01;


        $( evt.target ).siblings( ".val-box" ).html( (value).toPrecision( 3 ) );


        switch ( $( evt.target ).attr( "id" ) ) {

            case "TranslateX":

                try {
                    //currTranslateMatrix.translate( value, 0, 0 );
                    currTranslations[Xindx] = value;
                } catch ( e ) {

                }
                currTransformMatrix = combineTransformations();


                drawScene();


                break;

            case "TranslateZ":

                try {
                    // currTranslateMatrix.translate( 0, 0, value );
                    currTranslations[Zindx] = value;
                } catch ( e ) {

                }
                currTransformMatrix = combineTransformations();


                drawScene();


                break;

            case "TranslateY":
                try {
                    //currTranslateMatrix.translate( 0, value, 0 );
                    currTranslations[Yindx] = value;
                } catch ( e ) {

                }

                currTransformMatrix = combineTransformations();


                drawScene();

                break;

            case "ScaleX":

                try {
                    //currScaleMatrix.scale( value, 1, 1 );
                    currScales[Xindx] = value;
                } catch ( e ) {

                }
                currTransformMatrix = combineTransformations();


                drawScene();


                break;

            case "ScaleY":
                try {
                    //currScaleMatrix.scale( 1, value, 1 );
                    currScales[Yindx] = value;
                } catch ( e ) {

                }
                currTransformMatrix = combineTransformations();


                drawScene();


                break;

            case "ScaleZ":
                try {
                    //currScaleMatrix.scale( 1, 1, value );
                    currScales[Zindx] = value;
                } catch ( e ) {

                }
                currTransformMatrix = combineTransformations();


                drawScene();

                break;

            case "ShearingXAngle":
                try {
                    //currShearMatrix.shear( value, 0 );
                    currShears[Xindx] = value;
                } catch ( e ) {

                }
                currTransformMatrix = combineTransformations();


                drawScene();

                break;

            case "ShearingYAngle":
                try {
                    //currShearMatrix.shear( 0, value );
                    currShears[Yindx] = value;
                } catch ( e ) {

                }
                currTransformMatrix = combineTransformations();


                drawScene();


                break;

            case "RotationAngle":
                console.log( "ROTATE VALUE:" + value );

                switch ( currentRotateAxis ) {
                    case "Zaxis":
                        try {
                            //currRotateMatrix.rotate( 0, 0, value );
                            currRotations[Zindx] = value - 180;
                        } catch ( e ) {

                        }
                        currTransformMatrix = combineTransformations();


                        drawScene();


                        break;
                    case "Xaxis":
                        try {
                            //currRotateMatrix.rotate( value, 0, 0 );
                            currRotations[Xindx] = value;
                        } catch ( e ) {

                        }
                        currTransformMatrix = combineTransformations();


                        drawScene();


                        break;
                    case "Yaxis":
                        try {
                            //currRotateMatrix.rotate( 0, value, 0 ) ;
                            currRotations[Yindx] = value;
                        } catch ( e ) {

                        }
                        currTransformMatrix = combineTransformations();


                        drawScene();


                        break;
                }


                break;
        }


    } );


    $( 'input[type=radio][name=rotate_axis]' ).change( function () {
        if ( this.value === 'Xaxis' ) {
            $( "#rotationangle" ).val( currRotations[Xindx].toPrecision(3) );
            $( "#rotate-val" ).html( currRotations[Xindx].toPrecision( 3 ) );
            currentRotateAxis = "Xaxis";

        }
        else if ( this.value === 'Yaxis' ) {
            $( "#rotationangle" ).val( currRotations[Yindx] );
            $( "#rotate-val" ).html( currRotations[Yindx].toPrecision( 3 ) );
            currentRotateAxis = "Yaxis";

        } else {
            $( "#rotationangle" ).val( currRotations[Zindx] );
            $( "#rotate-val" ).html( (currRotations[Zindx]).toPrecision( 3 ) );
            currentRotateAxis = "Zaxis";
        }
    } );


    $( "#myDropdown" ).children( "a" ).click( ( evt ) => {

        $( "#drop_btn" ).html( $( evt.target ).html() );

        $( "#transformControls" ).addClass( "show-transition" );

        //$( "#start_transformsbtn" ).addClass( "show-transition" );

        switch ( $( evt.target ).attr( "id" ) ) {
            case "orthoView":
                currentView = "ORTHO";
                generateOrthographicProjectionView();
                break;
            case "axonView":
                currentView = "AXON";
                generateAxonometricProjectionView();
                break;
            case "obliqView":
                currentView = "OBLIQ";
                generateObliqueProjectionView( 60, 67 );
                break;
            case "1vanishView":
                currentView = "1VANISH";
                generatePrespectiveProjectionView( 1 );
                break;
            case "2vanishView":
                currentView = "2VANISH";

                generatePrespectiveProjectionView( 2 );
                break;
            case "3vanishView":
                currentView = "3VANISH";

                generatePrespectiveProjectionView( 3 );
                break;
        }


    } );

    //language=JQuery-CSS
    $( "#drop_btn" ).click( ( evt ) => {
        $( "#myDropdown" ).toggleClass( "show" );


    } );


    $( "body" ).click( ( evt ) => {

        if ( !$( evt.target ).is( "#drop_btn" ) ) {

            $( "#myDropdown" ).removeClass( "show" );
        }

    } );


} );




var MAT3d;

function setGeometry( gl ) {

    let positions = new Float32Array( [
        // front face
        300, 300, 0,
        600, 400, 0,
        600, 300, 0,

        300, 400, 0,
        600, 400, 0,
        300, 300, 0,


        // top face
        300, 400, 0,

        600, 400, 450,
        600, 400, 0,

        300, 400, 450,
        600, 400, 450,
        300, 400, 0,


        // LEFT face
        300, 300, 450,
        300, 400, 0,
        300, 300, 0,

        300, 400, 450,
        300, 400, 0,
        300, 300, 450,

        //RIGHT face
        600, 300, 0,
        600, 400, 450,
        600, 300, 450,

        600, 400, 0,
        600, 400, 450,
        600, 300, 0,

        // back face
        600, 300, 450,
        300, 400, 450,
        300, 300, 450,

        600, 400, 450,
        300, 400, 450,
        600, 300, 450,

        // BOTTOM face
        300, 300, 450,
        600, 300, 0,
        600, 300, 450,

        300, 300, 0,
        600, 300, 0,
        300, 300, 450,

    ] );


    let matrix = new MAT3d().setOrigin({x:450,y:350,z:125}).rotate(0,0,-180);//.translate( -450, -350, -125 );
    //matrix = m4.translate( matrix, -50, -75, -15 );

    for ( let ii = 0; ii < positions.length; ii += 3 ) {
        let vector = math4d.transformVector( matrix.getMatrixAsArray(), [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1] );
        positions[ii + 0] = vector[0];
        positions[ii + 1] = vector[1];
        positions[ii + 2] = vector[2];
    }

    gl.bufferData(
        gl.ARRAY_BUFFER,
        positions,
        gl.STATIC_DRAW );
}

// Fill the buffer with texture coordinates the F.
function setTexcoords( gl ) {
    const W = 853;
    const H = 606;

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array( [


            // FRONT X/W  Y/H



            0 / W, 395 / H,
            408 / W, 600 / H,
            408 / W, 395 / H,



            0 / W, 600 / H,
            408 / W, 600 / H,
            0 / W, 395 / H,






            // TOP FACE
            0 / W, 0 / H,

            408 / W, 395 / H,
            408 / W, 0 / H,

            0 / W, 395 / H,

            408 / W, 395 / H,
            0 / W, 0 / H,


            // LEFT
            408 / W, 395 / H,
            834 / W, 600 / H,
            834 / W, 395 / H,

            408 / W, 600 / H,
            834 / W, 600 / H,
            408 / W, 395 / H,

            // right
            408 / W, 395 / H,
            834 / W, 600 / H,
            834 / W, 395 / H,

            408 / W, 600 / H,
            834 / W, 600 / H,
            408 / W, 395 / H,

            //  back
            408 / W, 395 / H,
            834 / W, 600 / H,
            834 / W, 395 / H,

            408 / W, 600 / H,
            834 / W, 600 / H,
            408 / W, 395 / H,

            // bottom
            408 / W, 0 / H,
            834 / W, 395 / H,
            834 / W, 0 / H,

            408 / W, 395 / H,
            834 / W, 395 / H,
            408 / W, 0 / H,


        ] ),
        gl.STATIC_DRAW );
}