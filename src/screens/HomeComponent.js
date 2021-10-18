import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { fetchCampsites } from '../redux/campsitesSlice';
import { fetchPartners } from '../redux/partnersSlice';
import { fetchPromotions } from '../redux/promotionsSlice';
import { Animated } from 'react-native';
import RenderItem from '../components/RenderItemComponent'

const Home = () => {
    // const [scaleValue, setScaleValue] = useState(new Animated.Value(0))
    const campsites = useSelector((state) => state.campsites)
    const partners = useSelector((state) => state.partners)
    const promotions = useSelector((state) => state.promotions)
    const dispatch = useDispatch();
    // const animate = () => {
    //     Animated.timing(
    //         setScaleValue({
    //             toValue: 1,
    //             duration: 1500,
    //             useNativeDriver: true
    //         })
    //     ).start();
    // }

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start();
    }


    useEffect(() => {
        dispatch(fetchCampsites())
        dispatch(fetchPartners())
        dispatch(fetchPromotions())
    }, [dispatch])
    
    useEffect(() => {
        fadeIn();
    })

    return (
        <Animated.ScrollView>
            <RenderItem
                item={campsites.campsites.filter(campsite => campsite.featured)[0]}
                status={campsites.status}
                errMess={campsites.errMess}
                itemType='Campsites'
            />
            <RenderItem
                item={promotions.promotions.filter(promotion => promotion.featured)[0]}
                status={promotions.status}
                errMess={promotions.errMess}
                itemType='Promotions'
            />
            <RenderItem
                item={partners.partners.filter(partner => partner.featured)[0]}
                status={partners.status}
                errMess={partners.errMess}
                itemType='Partners'
            />
        </Animated.ScrollView>
    )
}

export default Home;