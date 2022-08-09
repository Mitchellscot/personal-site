import objectTypes from '../constants/objectTypes'

export default {
  title: 'Seo Data',
  name: objectTypes.seo,
  type: 'object',
  fields: [
    {
      name: 'pageTitle',
      type: objectTypes.string,
      title: 'Page Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'metaDescription',
      type: objectTypes.text,
      title: 'Meta Description',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}