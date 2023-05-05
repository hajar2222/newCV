

export const validaition = (schema) => {
  let errors = [];
  return async (req, res, next) => {
   
      const {error} = await schema.validate(req.body, { abortEarly: false } );
      if(error)
      {errors = error.details.map((e) => e.message);
      res.json({message:errors})}
      else
      next()
     
  };
};
