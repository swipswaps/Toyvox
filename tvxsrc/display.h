#include <iostream>
#include "tvxutil.h"
#include "tvx_glutil.h"

namespace tvx {
	class Display
	{
	public:
	    Display(std::string& game_title, glm::ivec2& resolution, GLuint& window_flags)
	        : m_is_closed( false )
	    {
	        SDL_Init( SDL_INIT_EVERYTHING );

	        SDL_GL_SetAttribute( SDL_GL_RED_SIZE, 8 );
	        SDL_GL_SetAttribute( SDL_GL_GREEN_SIZE, 8 );
	        SDL_GL_SetAttribute( SDL_GL_BLUE_SIZE, 8 );
	        SDL_GL_SetAttribute( SDL_GL_ALPHA_SIZE, 8 );
	        SDL_GL_SetAttribute( SDL_GL_BUFFER_SIZE, 32 );
	        SDL_GL_SetAttribute( SDL_GL_DOUBLEBUFFER, 1 );

	        SDL_GL_SetAttribute( SDL_GL_CONTEXT_MAJOR_VERSION, 4 );
	        SDL_GL_SetAttribute( SDL_GL_CONTEXT_MINOR_VERSION, 0 );
	        SDL_GL_SetAttribute( SDL_GL_CONTEXT_PROFILE_MASK, SDL_GL_CONTEXT_PROFILE_CORE );

	        m_window = SDL_CreateWindow
	            (
	            game_title.c_str(), SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
	            resolution.x, resolution.y,
	            window_flags
	            );
	        m_gl_context = SDL_GL_CreateContext( m_window );

					gladLoadGLLoader(SDL_GL_GetProcAddress);

					// Load OpenGL pointers and print info
					printf("OpenGL loading...\n");

					printf("Vendor:          %s\n", glGetString(GL_VENDOR));
					printf("Renderer:        %s\n", glGetString(GL_RENDERER));
					printf("Version OpenGL:  %s\n", glGetString(GL_VERSION));
					printf("Version GLSL:    %s\n\n\n", glGetString(GL_SHADING_LANGUAGE_VERSION));
					fflush(stdout); fflush(stderr);
	    }

	    bool is_closed()
	    {
	        return m_is_closed;
	    }

			void init()
			{
				define_shaders();
				program = program_from_file(vertex_shader_path, pixel_shader_path);

				float quad[] =
				{
					-1.0f,  1.0f,	// v0 - top left corner
					-1.0f, -1.0f,	// v1 - bottom left corner
					 1.0f,  1.0f,	// v2 - top right corner
					 1.0f, -1.0f	// v3 - bottom right corner
				};

				// Create the vertex array object for the full screen quad.

				glGenVertexArrays(1, &m_vertexArrayObject);
				glBindVertexArray(m_vertexArrayObject);

				// Create the Vertex Buffer Object for the full screen quad.

				glGenBuffers(1, &m_vertexBufferObject);
				glBindBuffer(GL_ARRAY_BUFFER, m_vertexBufferObject);
				glBufferData(GL_ARRAY_BUFFER, sizeof(quad), quad, GL_STATIC_DRAW);

				// Map the generic vertex attributes used by the full screen quad's shader
				// program to the full screen quad's vertex data stored in the vertex
				// buffer object.

				glVertexAttribPointer("PositionNDC", 2, GL_FLOAT, GL_FALSE, 0, BUFFER_OFFSET(0));
				glEnableVertexAttribArray("PositionNDC");

				glBindVertexArray(0);
			}

	    void update()
	    {
					glUseProgram(program);

			    glClearColor(0.0f, 0.0f, 0.0f, 0.0f);
			    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);

					glBindVertexArray(m_vertexArrayObject);

					glDrawArrays(GL_TRIANGLE_STRIP, 0, 8);

					glBindVertexArray(0);

	        SDL_GL_SwapWindow( m_window );
	        SDL_Event e;
	        while( SDL_PollEvent( &e ) )
	        {
	            if( e.type == SDL_QUIT )
	            {
	                m_is_closed = true;
	            }
	        }
	    }

	    ~Display()
	    {
				if (m_vertexArrayObject)
				{
					glDeleteVertexArrays(1, &m_vertexArrayObject);
					m_vertexArrayObject = 0;
				}

				if (m_vertexBufferObject)
				{
					glDeleteBuffers(1, &m_vertexBufferObject);
					m_vertexBufferObject = 0;
				}
				glBindVertexArray(0);
				glUseProgram(0);
        SDL_GL_DeleteContext( m_gl_context );
        SDL_DestroyWindow( m_window );
        SDL_Quit();
	    }

	    Display( const Display& other )
	    {
	        //copy ctor
	    }

	    Display& operator=( const Display& rhs )
	    {
	        if( this == &rhs ) return *this; // handle self assignment
	        //assignment operator
	        return *this;
	    }

	private:
	    SDL_Window* m_window;
	    SDL_GLContext m_gl_context;
			GLuint program;
			GLuint VAO, VBO;
	    bool m_is_closed;
			GLuint m_vertexBufferObject, m_vertexArrayObject;
	};
}