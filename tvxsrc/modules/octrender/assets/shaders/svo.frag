#version 420 core

layout (location = 0) in vec2 resIn;
layout (location = 1) in float timeIn;
layout (location = 2) in float dtIn;
layout (location = 0) out vec4 fsOut;

layout (std140, binding = 0) uniform shader_data {
	vec4 buf[4096]; // pack any data into vec4 to make full use of the aligned storage
};

#define BUNNY
//#define SPHERE

//bunny 32sq
#ifdef BUNNY
int voxels[1840] = int[1840](1,0,0,0,0,0,0,0,8,11,2,44,116,122,154,161,0,0,3,0,63,57,36,47,0,5,0,4,0,6,0,7,0,0,0,0,-1,-1,-1,-1,0,0,0,0,0,0,0,-1,-1,0,-1,-1,-1,0,-1,-1,-1,-1,-1,0,-1,-1,0,0,0,18,0,9,68,21,53,28,0,0,0,0,0,10,0,14,0,0,0,0,0,-1,-1,-1,16,0,12,0,24,50,30,41,0,0,0,0,13,20,15,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,-1,0,0,0,0,-1,0,-1,0,22,23,49,26,70,72,74,75,0,0,0,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,39,40,25,27,73,71,76,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,52,29,43,33,80,81,87,88,-1,-1,-1,-1,-1,-1,-1,-1,31,32,34,35,82,83,89,90,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,37,0,38,115,99,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,-1,-1,0,0,-1,-1,0,0,-1,0,0,0,-1,-1,42,0,56,0,84,113,91,0,-1,0,-1,0,-1,-1,-1,-1,0,-1,0,0,-1,-1,-1,-1,0,0,0,0,60,65,45,0,0,0,46,0,0,0,0,0,-1,0,-1,0,-1,0,0,0,0,67,0,48,100,101,102,103,0,0,0,-1,-1,-1,-1,-1,0,0,0,0,0,-1,0,0,0,0,51,0,104,0,78,106,0,0,0,0,-1,0,-1,0,0,0,0,0,-1,-1,-1,-1,0,54,0,55,107,79,85,86,0,0,0,0,0,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-1,0,58,59,0,0,93,94,110,114,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,61,62,0,0,95,96,111,112,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,64,0,0,108,92,109,98,0,0,0,0,-1,-1,0,0,66,0,0,0,97,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,-1,-1,0,0,0,0,0,69,0,105,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,-1,0,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,0,-1,0,0,-1,0,-1,0,0,0,0,0,0,0,-1,0,0,0,-1,-1,0,-1,0,0,0,-1,0,-1,-1,0,-1,0,-1,0,-1,-1,0,0,0,-1,0,0,0,-1,0,-1,0,-1,0,-1,-1,-1,0,-1,0,-1,-1,-1,0,-1,-1,-1,0,0,-1,-1,-1,0,-1,-1,0,0,-1,-1,0,0,-1,0,0,0,-1,-1,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,0,-1,0,0,117,119,135,137,0,215,0,223,0,118,0,134,0,178,0,183,0,0,0,-1,0,0,0,-1,120,121,128,129,179,181,184,185,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,123,126,140,143,217,0,220,0,124,125,130,131,182,180,186,187,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,127,0,132,133,0,0,188,0,0,0,-1,-1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,0,-1,-1,0,0,0,-1,0,0,0,-1,146,136,147,148,195,189,196,197,-1,-1,-1,-1,-1,-1,-1,-1,138,139,149,150,190,191,198,199,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,141,142,151,152,192,193,200,201,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,144,145,153,0,194,0,202,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,-1,-1,0,0,0,-1,0,-1,0,0,0,-1,-1,-1,0,-1,0,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,155,158,173,176,228,0,0,0,156,157,167,168,209,203,210,211,0,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,159,160,169,170,204,205,212,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,162,165,0,0,0,0,0,0,163,164,171,172,206,207,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,166,0,0,0,208,0,0,0,-1,-1,-1,0,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,-1,0,-1,-1,0,0,0,0,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,174,175,0,0,213,214,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,177,0,0,0,0,0,0,0,-1,0,0,0,-1,0,0,0,0,0,0,-1,0,0,0,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,-1,0,0,0,0,0,0,-1,-1,-1,-1,-1,0,0,0,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,0,0,-1,0,-1,-1,-1,-1,0,0,0,-1,-1,-1,-1,-1,0,0,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,0,0,0,-1,0,0,0,0,0,-1,0,-1,0,0,0,0,-1,-1,-1,-1,0,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,0,0,-1,-1,-1,-1,-1,0,0,0,-1,0,0,0,0,0,0,0,0,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,0,216,0,0,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,218,219,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,-1,0,0,0,0,0,221,222,226,227,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,0,-1,-1,0,0,0,0,0,224,0,225,0,0,0,0,0,-1,0,-1,0,0,0,0,0,-1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,-1,0,0,0,0,0,0,0,0,229,0,0,0,0,0,0,0,0,-1,0,0,0,0,0);
//small test to understand the layout
#elif defined(SPHERE)
int voxels[480] = int[480](3,5,7,1,30,28,37,40,2,10,12,0,21,22,24,25,-1,0,0,0,-1,-1,-1,-1,0,0,0,4,0,13,18,15,0,0,0,0,-1,-1,-1,-1,0,0,6,9,14,26,16,17,0,0,0,0,-1,-1,-1,-1,0,8,0,11,19,20,27,23,0,0,0,0,-1,-1,-1,-1,0,0,0,0,0,0,-1,0,0,0,0,0,-1,0,-1,0,0,0,0,0,0,-1,0,0,0,0,0,0,-1,-1,0,0,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,-1,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,-1,0,0,29,32,35,36,48,0,50,51,-1,0,-1,-1,0,0,-1,-1,0,31,33,34,0,47,52,49,0,0,-1,-1,0,0,-1,-1,0,0,-1,0,0,0,-1,0,0,-1,0,-1,0,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,38,39,43,44,53,54,0,57,-1,-1,0,-1,0,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,41,42,45,46,55,56,58,59,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,0,0,-1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,-1,0,0,0,0,0,0,-1,0,0,0,0,0,0,-1,-1,0,0,0,0,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1,0,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,0,0,0,0,-1,-1,0,0,0,0,0,0,-1,-1,0,0,0,0,0,0,-1,0,0,0,0,0,0,0);
#else
int voxels[48] = int[48](3,0,0,1,-1,-1,-1,-1,
2,-1,0,0,0,0,-1,-1,
5,-1,-1,0,0,0,0,0,
0,4,0,0,0,0,0,0,
0,-1,-1,0,0,0,0,0,
-1,-1,0,0,0,0,0,0);
#endif
const vec3 PPP = vec3(1, 1, 1);
const vec3 PNP = vec3(1, -1, 1);
const vec3 PNN = vec3(1, -1, -1);
const vec3 NPN = vec3(-1, 1, -1);
const vec3 NNN = vec3(-1, -1, -1);
const vec3 NNP = vec3(-1, -1, 1);
const vec3 NPP = vec3(-1, 1, 1);
const vec3 PPN = vec3(1, 1, -1);
const vec3 POS[8] = vec3[8](PNN, PNP, PPN, PPP, NNN, NNP, NPN, NPP);
struct Ray { vec3 o, d, invDir; };
struct Hit {
	vec3 p;
	float t;	// solution to p=o+t*d
	float tmax;    //distance to exit point?
	float tmin;    // distance to enter point?
	vec3 n;		// normal
};
bool BBoxIntersect(const vec3 boxMin, const vec3 boxMax, const Ray r, out Hit hit) {
	vec3 tbot = r.invDir * (boxMin - r.o);
	vec3 ttop = r.invDir * (boxMax - r.o);
	vec3 tmin = min(ttop, tbot);
	vec3 tmax = max(ttop, tbot);
	vec2 t = max(tmin.xx, tmin.yz);
	float t0 = max(t.x, t.y);
	t = min(tmax.xx, tmax.yz);
	float t1 = min(t.x, t.y);
	hit.tmin = t0;
	hit.tmax = t1;
	return t1 > max(t0, 0.0);
}
vec4 trace(Ray ray, inout Hit hit) {
	vec3 center = vec3(0.0f);
	float scale = 1.0f;
	vec3 minBox = center - scale;
	vec3 maxBox = center + scale;
	vec4 f = vec4(1.0f);
	struct Stack {
		int index;
		vec3 center;
		float scale;
	};
	Stack stack[10];
	int stackPos = 1;
	if (!BBoxIntersect(minBox, maxBox, ray, hit)) return f;
	int index = 0;
	scale *= 0.5f;
	stack[0] = Stack( 0, center, scale   );
	while(stackPos-- > 0) {
		f = vec4(0.1f);
		center = stack[stackPos].center;
		index = stack[stackPos].index;
		scale = stack[stackPos].scale;
		for (int i = 0; i < 8; ++i) {
			vec3 new_center = center + scale * POS[i];
			vec3 minBox = new_center - scale;
			vec3 maxBox = new_center + scale;
			if (!BBoxIntersect(minBox, maxBox, ray, hit)) continue;
			int v = voxels[(index * 8)+i];
			if (v == 0){
				continue;
			} else if (v < 0){
				return vec4(1.0f,0.0f,0.0f,1.0f);
			} else {
				stack[stackPos++] = Stack( voxels[(index * 8) + i], new_center, scale*0.5f   );
				f.z += 0.4f;
				
			}
		}
	}
	return f;
}
vec2 rotate2d(vec2 v, float a) {
	float sinA = sin(a);
	float cosA = cos(a);
	return vec2(v.x * cosA - v.y * sinA, v.y * cosA + v.x * sinA);
}

void main() {
	vec2 uv = gl_FragCoord.xy / resIn.xy;
	vec2 screenPos = (gl_FragCoord.xy / resIn.xy) * 2.0 - 1.0;
	vec3 cameraDir = vec3(0.0, 0.0, 0.8);
	vec3 cameraPlaneU = vec3(1.0, 0.0, 0.0);
	vec3 cameraPlaneV = vec3(0.0, 1.0, 0.0) * resIn.y / resIn.x;
	vec3 rayDir = cameraDir + screenPos.x * cameraPlaneU + screenPos.y * cameraPlaneV;
	vec3 rayPos = vec3(0.0, 0.25 * sin(timeIn * 2.7), -3.4);
	rayPos.xz = rotate2d(rayPos.xz, timeIn);
	rayDir.xz = rotate2d(rayDir.xz, timeIn);
	Ray ray;
	Hit hit = Hit(vec3(0.0, 0.0, 0.0), 0.0, 0.0, 0.0, vec3(0.0, 0.0, 0.0));
	ray.o = rayPos;
	ray.d = rayDir;
	ray.invDir = 1.0f/rayDir;
	vec4 color = trace(ray, hit);
	if (length(color) > 0.5f) {
		fsOut = color;
	}
	
}