import CategorySection from '@/components/homepage/CategorySection';
import FeaturedProducts from '@/components/homepage/FeaturedProduct';
import HeroSection from '@/components/homepage/HeroSection';
import MarketplaceStats from '@/components/homepage/MarketplaceStats';
import SuccessStories from '@/components/homepage/SuccessStories';
import TopRatedSellers from '@/components/homepage/TopRatedSellers';
import WhySecondHand from '@/components/homepage/WhySecondHand';
import React from 'react';

const MainPage = () => {
    return (
        <div>
            <HeroSection/>
            <CategorySection/>
            <FeaturedProducts/>
            <SuccessStories/>
            <MarketplaceStats/>
            <TopRatedSellers/>
            <WhySecondHand/>
        </div>
    );
};

export default MainPage;