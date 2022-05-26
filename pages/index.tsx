import type { GetStaticProps, NextPage } from 'next'
import { Fragment } from 'react'
import HomeAbout from '../components/home/home-about'
import HomeAnnouncement from '../components/home/home-announcement'
import HomeHero from '../components/home/home-hero'
import HomeProducts from '../components/home/home-products'
import PhoneFeature from '../components/home/phone-feature'
import { findAllPhones } from '../lib/db'
import { Phone, Phones } from '../Model/Types'
import classes from "./index.module.scss"


const Home: NextPage<Phones> = (props) => {
  const data = props.phones;
  const phones: Phone[] = []
  let count = 4;
  if(data.length < 4) {
    count = data.length
  }
  for(let i = 0; i < count; i++) {
    phones.push(data[i]);
  }

  return (
    <Fragment>
      <div className={classes.main_container}>
        <HomeHero />
        <HomeProducts phones={phones}/>
        <HomeAbout />
        <HomeAnnouncement />
        <PhoneFeature />
      </div>

    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await findAllPhones();
  const JSONdata = JSON.stringify(data);
  const phones = JSON.parse(JSONdata);

  return {
    props: {
      phones: phones
    }
  }
}

export default Home