import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react'
import { findAllPhones, findOnePhone, findPhoneFeature } from '../../lib/db';
import { Feature, Phone } from '../../Model/Types';
import ProductDetailPage from '../../components/product/product-detail';

interface PropsType {
  phone: Phone[];
  feature: Feature[];
}

const ProductDetail: NextPage<PropsType> = (props) => {
  const { phone, feature } = props;

  return (
    <ProductDetailPage phone={phone[0]} feature={feature[0]} />
    )
}

interface ContextType extends ParsedUrlQuery{
  slug: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params as ContextType;

  const data_phone = await findOnePhone(slug);
  const JSONdata_phone = JSON.stringify(data_phone);
  const phoneData = JSON.parse(JSONdata_phone) as Phone[];

  const data_feature = await findPhoneFeature(String(phoneData[0].feature_id));
  const JSONdata_feature = JSON.stringify(data_feature);
  const featureData = JSON.parse(JSONdata_feature)

  return {
    props: {
      phone: phoneData,
      feature: featureData
    },
    revalidate: 600
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await findAllPhones();
  const dataJSON = JSON.stringify(data);
  const allPhoneData = JSON.parse(dataJSON) as Phone[];
  const phoneArr: Phone[] = allPhoneData;

  const slugs = phoneArr.map(phone => phone.id );

  return {
    paths: slugs.map(slug => ({
      params: {
        slug: String(slug)
      }
    })),
    fallback: false
  }
}

export default ProductDetail