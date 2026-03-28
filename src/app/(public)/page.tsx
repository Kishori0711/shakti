import AboutSection from '@/components/landingPage/AboutSection/AboutSection'
import FeaturedCoursesSection from '@/components/landingPage/FeaturedCoursesSection/FeaturedCoursesSection'
import HeroSection from '@/components/landingPage/HeroSection/HeroSection'
import MentorsMarqueeSection from '@/components/landingPage/MentorsSection/MentorsMarqueeSection'
import MovingTextSection from '@/components/landingPage/MovingTextSection/MovingTextSection'
import PathwaySection from '@/components/landingPage/PathwaySection/PathwaySection'
import TestimonialsSection from '@/components/landingPage/TestimonialsSection/TestimonialsSection'
import TrustedSection from '@/components/landingPage/TrustedSection/TrustedSection'
import UpcomingEventsSection from '@/components/landingPage/UpcomingEventsSection/UpcomingEventsSection'
import WhyJoinUsSection from '@/components/landingPage/WhyJoinUsSection/WhyJoinUsSection'


const page = () => {
  return (
    <div>
     <HeroSection /> 
    <TrustedSection />
    <MovingTextSection />
    <AboutSection />
    <PathwaySection />
    <MentorsMarqueeSection />
     <FeaturedCoursesSection />
    <WhyJoinUsSection />
    <UpcomingEventsSection />
    <TestimonialsSection />

    </div>
  )
}

export default page
