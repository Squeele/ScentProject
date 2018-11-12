/**
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Sobel Edge Detection (see https://youtu.be/uihBwtPIBxM)
 *
 * As mentioned in the video the Sobel operator expects a grayscale image as input.
 *
 */

 /*Customized By Squeele : transforming the texture in grayscale (the input can be a color image), and adding the outline to the image */

THREE.SobelOperatorShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"resolution": { value: new THREE.Vector2() }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform vec2 resolution;",
		"varying vec2 vUv;",

		"void main() {",
            
			"vec2 texel = vec2( 1.0 / resolution.x, 1.0 / resolution.y );",
			"vec4 gray = vec4(0.33,0.33,0.33,1.0);",
			// kernel definition (in glsl matrices are filled in column-major order)

			"const mat3 Gx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 );", // x direction kernel
			"const mat3 Gy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 );", // y direction kernel

			// fetch the 3x3 neighbourhood of a fragment

			// first column

			"float tx0y0 = dot(texture2D( tDiffuse, vUv + texel * vec2( -1, -1 ) ),gray);",
			"float tx0y1 = dot(texture2D( tDiffuse, vUv + texel * vec2( -1,  0 ) ),gray);",
			"float tx0y2 = dot(texture2D( tDiffuse, vUv + texel * vec2( -1,  1 ) ),gray);",

			// second column

			"float tx1y0 = dot(texture2D( tDiffuse, vUv + texel * vec2(  0, -1 ) ),gray);",
			"float tx1y1 = dot(texture2D( tDiffuse, vUv + texel * vec2(  0,  0 ) ),gray);",
			"float tx1y2 = dot(texture2D( tDiffuse, vUv + texel * vec2(  0,  1 ) ),gray);",

			// third column

			"float tx2y0 = dot(texture2D( tDiffuse, vUv + texel * vec2(  1, -1 ) ),gray);",
			"float tx2y1 = dot(texture2D( tDiffuse, vUv + texel * vec2(  1,  0 ) ),gray);",
			"float tx2y2 = dot(texture2D( tDiffuse, vUv + texel * vec2(  1,  1 ) ),gray);",

			// gradient value in x direction

			"float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 + ",
				"Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 + ",
				"Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2; ",

			// gradient value in y direction

			"float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 + ",
				"Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 + ",
				"Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2; ",

			// magnitute of the total gradient

			"float G = sqrt( ( valueGx * valueGx ) + ( valueGy * valueGy ) );",
            "G = 1.0 - G;",

			"gl_FragColor = vec4( texture2D(tDiffuse,vUv).rgb*G, 1.0 );",

		"}"

	].join( "\n" )

};
