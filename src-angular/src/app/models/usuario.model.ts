export class Usuario{

  public id?:number;
  public nombreUsuario?: string;
  public email: string = "";
  public password: string = "";
  public roles:string[] = [];

    constructor(password:string, email:string){
      this.email = email;
      this.password = password;
    }

}
