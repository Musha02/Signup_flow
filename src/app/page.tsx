import Navbar from "@/components/navbar";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import code from "@/components/images/auth0.png";

export default function Home() {

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <section className="mx-auto flex max-w-6xl  flex-col-reverse gap-2  px-4  pb-12 transition-all md:flex-row md:gap-4">
        {/* left div */}
        <div className=" flex flex-col items-center  gap-6 pt-8 text-center md:w-1/2 md:items-start md:gap-10 md:pt-28 md:text-left">
          <Balancer>
            <h1 className="text-4xl font-semibold md:text-6xl">
              Assignment !
            </h1>
          </Balancer>
          <Balancer>
            <p className=" text-neutral-400 md:max-w-[700px]  md:text-xl">
            Task: Implement a Sign-Up Flow with Role-Based Authorization
            <br></br><br></br>
            Objective: 
            Your task is to create a sign-up flow in a Next.js application, integrated with Auth0 for authentication and role-based authorization. The application should manage user roles by updating the isAdmin field in the database based on permissions set in the Auth0 dashboard.
            </p>
          </Balancer>
          
        </div>

        {/* right div */}
        <section className="md:w-1/2 md:pt-24 ">
          <Image
            className="hidden h-auto max-w-[600px]  md:block"
            src={code}
            alt="code-image"
          />
          <Image
            className="h-auto w-full  md:hidden"
            src={code}
            alt="code-image"
          />
        </section>
      </section>
      {/* Footer */}
      <footer className="text-center py-4 bg-gray-200 mt-20">
        <p className="text-gray-600">@2024 All rights reserved</p>
      </footer>

    </div>
  );
}
