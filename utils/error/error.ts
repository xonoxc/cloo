export class ApplicationError extends Error {
   public title: string
   public description: string

   constructor(title: string, description: string) {
      super(description)
      this.title = title
      this.description = description
      this.name = "ApplicationError"
      Object.setPrototypeOf(this, ApplicationError.prototype)
   }

   /*
    * static method on application error class for checking application errors
    * **/
   public static isError(err: unknown): boolean {
      return err instanceof ApplicationError
   }
}
