import React from 'react'
import { Link } from 'react-router-dom';


const Terms = () => {
  return (
    <main className="flex h-screen justify-center items-center flex-col">
      <div className="w-full h-screen bg-[url('./assets/hero14.jpg')] bg-cover bg-center grayscale-0 flex justify-center">
        <div className="w-[50%] bg-gray-600 h-[75%] mt-[5%] rounded-md shadow-md shadow-black overflow-auto">
          <div className=" text-orange-300 text-center">
            <h1 className="text-xl font-bold mt-10">Terms and Conditions</h1>
          </div>
          <div className="">
            <div className="text-left mt-10 w-[80%] ml-[10%] text-white overflow-auto">
              <p className="font-bold">Last Update: May 18, 2018</p> <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                quisquam vel harum molestiae iste tempore at sequi
                necessitatibus eligendi corporis id earum excepturi aliquid
                omnis quasi, aut animi consectetur? Explicabo?
              </p>
              <br />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Reprehenderit soluta id, vel repellat enim esse quos cupiditate
                totam accusamus autem atque aspernatur illum itaque consequuntur
                saepe incidunt quibusdam et repellendus.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                numquam, sint accusamus alias obcaecati voluptate. Dolore
                voluptatem iusto voluptatibus quo accusantium mollitia quasi id,
                autem optio consequatur, velit delectus nemo?
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, ducimus repellendus? Porro quisquam asperiores
                ipsam numquam nam cumque laudantium, culpa, facere reprehenderit
                ratione dolor, temporibus possimus corporis ipsa exercitationem
                aliquam.
              </p>
              <br />
              <p className="mb-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
                repellendus dignissimos itaque commodi laudantium a? Ullam
                repellat illum officiis non, ad illo excepturi commodi error
                maiores reiciendis quasi tempore voluptate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Terms