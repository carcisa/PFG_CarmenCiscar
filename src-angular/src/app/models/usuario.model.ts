// export class Usuario{

//   public id?:number;
//   public nombreUsuario?: string;
//   public email: string = "";
//   public password: string = "";
//   public roles:string[] = [];

//     constructor(password:string, email:string){
//       this.email = email;
//       this.password = password;
//     }

// }

// src/app/models/usuario.model.ts

export class Usuario {
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public password: string = '';

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
