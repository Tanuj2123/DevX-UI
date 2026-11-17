import axios from "axios";
import { BACKEND_URL } from "../utils/constants";


const Upgrade = () => {


    const handleBuyClick = async (type)=>{
        try {
            const order = await axios.post(BACKEND_URL+"/payment/createOrder",{
                membershipType:type
            },{withCredentials:true});

            console.log(order);

            const {keyId,amount,currency,notes,orderId} = order.data;

            const options = {
                key: keyId,
                amount, 
                currency,
                name: 'DevX',
                description: 'Build Your Connections',
                order_id: orderId,
                prefill: {
                name: notes.name,
                email: notes.email,
                },
                theme: {
                color: '#F37254'
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <div className="flex justify-between">
            <main className="flex min-h-[70vh] items-center justify-center px-28 py-10">
            <section className="card w-full max-w-lg border border-base-300 bg-base-200 shadow-xl">
                <div className="card-body gap-6 p-6 text-center sm:p-8">
                    <div className="space-y-2">
                        <p className="text-lg font-semibold  tracking-[0.2em] text-gray-400">DevX Silver Premium</p>
                        <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
                            Experience DevX to the fullest
                        </h1>
                        <p className="text-base-content/70">Upgrade now and unlock more ways to connect.</p>
                    </div>

                    <div className="rounded-xl bg-base-100 p-5 text-left">
                        <h2 className="mb-3 text-lg font-semibold text-base-content">With Silver</h2>
                        <ul className="list-inside list-disc space-y-2 text-base-content/80">
                            <li>Verified user</li>
                            <li>500 connections</li>
                            <li>Chat Feature</li>
                        </ul>
                    </div>

                    <button className="btn btn-secondary w-full" type="button" onClick={()=>handleBuyClick("silver")}>Upgrade Now</button>
                </div>
            </section>
        </main>
        <main className="flex min-h-[70vh] items-center justify-center px-28 py-10">
            <section className="card w-full max-w-lg border border-base-300 bg-base-200 shadow-xl">
                <div className="card-body gap-6 p-6 text-center sm:p-8">
                    <div className="space-y-2">
                        <p className="text-lg font-semibold  tracking-[0.2em] text-yellow-500">DevX Gold Premium</p>
                        <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
                            Experience DevX to the fullest
                        </h1>
                        <p className="text-base-content/70">Upgrade now and unlock more ways to connect.</p>
                    </div>

                    <div className="rounded-xl bg-base-100 p-5 text-left">
                        <h2 className="mb-3 text-lg font-semibold text-base-content">With Gold</h2>
                        <ul className="list-inside list-disc space-y-2 text-base-content/80">
                            <li>Verified user</li>
                            <li>Unlimited connections</li>
                            <li>Chat Feature</li>
                            <li>See who visits your profile</li>
                        </ul>
                    </div>

                    <button className="btn btn-primary w-full" type="button" onClick={()=>handleBuyClick("gold")}>Upgrade Now</button>
                </div>
            </section>
        </main>
        </div>
    )
}

export default Upgrade;