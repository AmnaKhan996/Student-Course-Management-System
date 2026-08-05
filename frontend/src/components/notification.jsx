import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, X, BellRing } from "lucide-react";

function Notification({ userId }) {

    const [notifications, setNotifications] = useState([]);

    const [open, setOpen] = useState(false);




    // Fetch existing notifications

        const fetchNotifications = async()=>{

            try{

                const response = await axios.get(
                    "http://localhost:8000/notifications",
                    {
                        headers:{
                            Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                console.log("Fetched notifications:", response.data);
                setNotifications(response.data);


            }
            catch(error){

                console.log(error);

            }

        };



    useEffect(()=>{

    fetchNotifications();

},[]);




    // Websocket
    useEffect(()=>{


        const socket = new WebSocket(
            `ws://localhost:8000/notifications/ws/${userId}`
        );



        socket.onmessage=(event)=>{


            const notification =
            JSON.parse(event.data);

            console.log("Received notification:", event.data);



            setNotifications(prev=>[
                notification,
                ...prev
            ]);


        };



        return ()=>{

            socket.close();

        };


    },[userId]);


    const markAsRead = async (notificationId) => {
        console.log("Marking notification as read:", notificationId);

    try {

        await axios.put(
            `http://localhost:8000/notifications/${notificationId}/read`,
            {},
            {
                headers:{
                    Authorization:
                    `Bearer ${localStorage.getItem("token")}`
                }
            }
        );


        // update UI immediately
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                ?
                {
                    ...notification,
                    is_read:true
                }
                :
                notification
            )
        );

        await fetchNotifications(); // Refresh notifications after marking as read


    } catch(error){

        console.log(error);

    }

};





return (
<>
    {/* Professional Notification Bell */}

    <div className="relative">

        <button
            onClick={()=>setOpen(true)}
            className="
            relative
            flex
            items-center
            justify-center
            w-12
            h-12
            rounded-full
            bg-gray-100
            hover:bg-indigo-100
            transition
            duration-200
            shadow-sm
            group
            "
        >

            <Bell
                size={24}
                className="
                text-gray-700
                group-hover:text-indigo-600
                transition
                "
            />


            {
 notifications.filter(
    notification => !notification.is_read
).length > 0 &&

<span
className="
absolute
-top-1
-right-1
bg-red-500
text-white
text-xs
font-bold
w-5
h-5
rounded-full
flex
items-center
justify-center
border-2
border-white
"
>

{
notifications.filter(
    notification => !notification.is_read
).length
}

</span>
            }

        </button>

    </div>



    {/* Notification Drawer */}

    {
    open &&

    <>

    {/* Background overlay */}

    <div
        onClick={()=>setOpen(false)}
        className="
        fixed
        inset-0
        bg-black/30
        backdrop-blur-sm
        z-[9998]
        "
    />


<div
className="
fixed
right-0
top-0
h-screen
w-[420px]
bg-white
shadow-2xl
z-[9999]
flex
flex-col
"
>


        {/* Header */}

        <div
            className="
            flex
            justify-between
            items-center
            px-6
            py-5
            border-b
            "
        >

            <div className="flex items-center gap-3">

                <div
                className="
                w-10
                h-10
                rounded-full
                bg-indigo-100
                flex
                items-center
                justify-center
                "
                >

                    <BellRing
                    size={22}
                    className="text-indigo-600"
                    />

                </div>


                <div>

                    <h2
                    className="
                    font-bold
                    text-lg
                    text-gray-800
                    "
                    >
                        Notifications
                    </h2>


                    <p
                    className="
                    text-sm
                    text-gray-500
                    "
                    >
                        Latest updates
                    </p>

                </div>

            </div>



            <button
            onClick={()=>setOpen(false)}
            className="
            w-9
            h-9
            rounded-full
            hover:bg-gray-100
            flex
            items-center
            justify-center
            "
            >

                <X size={20}/>

            </button>


        </div>




        {/* Notification List */}

        <div
        className="
        flex-1
        overflow-y-auto
        p-5
        space-y-4
        "
        >


        {
        notifications.length === 0

        ?

        <div
        className="
        flex
        flex-col
        items-center
        justify-center
        h-full
        text-gray-400
        "
        >

            <Bell
            size={45}
            className="mb-3 opacity-40"
            />

            <p>
                No notifications yet
            </p>

        </div>


        :


        notifications.map((notification,index)=>(

 <div
key={index}

onClick={()=>markAsRead(notification.id)}

className={`
group
border
rounded-2xl
p-4
transition
cursor-pointer

${
notification.is_read
?
"bg-white border-gray-200"
:
"bg-indigo-50 border-indigo-300"
}

hover:bg-indigo-100
`}
>


                <div
                className="
                flex
                justify-between
                "
                >

                    <h3
                    className="
                    font-semibold
                    text-gray-800
                    "
                    >
                        {notification.title}
                    </h3>


                    <span
                    className="
                    w-2
                    h-2
                    bg-indigo-500
                    rounded-full
                    "
                    />

                </div>


                <p
                className="
                text-sm
                text-gray-600
                mt-2
                leading-relaxed
                "
                >
                    {notification.message || notification.description}
                </p>


                <p
                className="
                text-xs
                text-gray-400
                mt-3
                "
                >
                    Just now
                </p>


            </div>

        ))

        }


        </div>



        {/* Footer */}

        <div
        className="
        border-t
        p-5
        "
        >

            <button
            className="
            w-full
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            "
            >

                View All Notifications

            </button>

        </div>



    </div>

    </>

    }

</>
);

}


export default Notification;