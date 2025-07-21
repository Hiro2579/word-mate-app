import { createClient } from "./supabase/client"


export const authRepository = {


  async signUp(name: string, email: string, password: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error != null ) throw new Error(error.message);
    return {...data.user, userName: data.user?.user_metadata.name, error};
  },


  async signIn(email: string, password: string){
    const supabase = await createClient();
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error != null ) throw new Error(error.message);
    return {...data.user, userName: data.user?.user_metadata.name, error};
  },


  async signOut(){
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if(error!= null) throw new Error(error.message);
    return true;
  }

};