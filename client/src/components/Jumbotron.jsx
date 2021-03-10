import React, { useEffect, useState } from 'react';
import AddRestaurant from './AddRestaurant';
import './styles/Jumbotron.css'

function Jumbotron() {

    const [background , setBackground] = useState(null)

    useEffect(() => {
        const backgroungImage = selectBackgroundImage()
        // console.log(backgroungImage)
        const imageStyle = {
            backgroundImage: `url('${backgroungImage}')`
        }
        setBackground(imageStyle)
    }, [])

    const selectBackgroundImage = () => {
        // Random integer from 1 to 3
        const randNum = Math.floor(Math.random() * 3) + 1 
        let image = ""
        if (randNum === 1) {
            image = "https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1573133725500-Y5PCN0V04I86HDAT8AT0/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/WBC_7095.jpg?format=2500w"
        } else if (randNum === 2) {
            image = "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/04/pizzapepperoni0.jpg"
        } else {
            image = "https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
        }
        return image
    }

    return (
        <>
        {background &&
            <div className="image-bg" style={background}>
            <h1>Add a restaurant</h1>
            <AddRestaurant />
            </div>
        }
       </>
    )
}

export default Jumbotron;
