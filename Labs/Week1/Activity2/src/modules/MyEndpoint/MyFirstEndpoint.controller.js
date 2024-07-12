
export const traerUsuarios = async (req, res, next) => {
    try {
       
      const usuarios = [
        {
          id: 1,
          nombre: "Juan Pérez",
          email: "juan.perez@example.com"
        },
        {
          id: 2,
          nombre: "María Gómez",
          email: "maria.gomez@example.com"
        },
        {
          id: 3,
          nombre: "Carlos Sánchez",
          email: "carlos.sanchez@example.com"
        }
      ];
      
      return res.status(200).json(usuarios);
    } catch (error) {
      next(error); 
    }
  };