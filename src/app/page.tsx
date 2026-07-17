'use client';

import React from 'react';
import Header from '@/components/layout/header';
import Hero from '@/components/home/hero';
import Features from '@/components/home/features';
import Categories from '@/components/home/categories';
import ProductsList from '@/components/home/products-list';
import CustomPrinting from '@/components/home/custom-printing';
import WhyChooseUs from '@/components/home/why-choose-us';
import VideoSection from '@/components/home/video-section';
import AboutCompany from '@/components/home/about-company';
import Testimonials from '@/components/home/testimonials';
import Stats from '@/components/home/stats';
import InstagramGallery from '@/components/home/instagram-gallery';
import Newsletter from '@/components/home/newsletter';
import Footer from '@/components/layout/footer';
import ChatWidget from '@/components/shared/chat-widget';

export default function Home() {
  return (
    <>
      {/* Global Navigation */}
      <Header />

      {/* Landing Modules */}
      <main className="flex-grow">
        <Hero />
        <Features />
        <Categories />
        <ProductsList />
        <CustomPrinting />
        <WhyChooseUs />
        <VideoSection />
        <AboutCompany />
        <Testimonials />
        <Stats />
        <InstagramGallery />
        <Newsletter />
      </main>

      {/* Global Footer & Chat Support Widgets */}
      <Footer />
      <ChatWidget />
    </>
  );
}
