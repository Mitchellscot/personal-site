import {LinkIcon, EarthGlobeIcon} from '@sanity/icons'
import objectTypes from '../constants/objectTypes'
import pageTypes from '../constants/pageTypes'

export default {
  name: pageTypes.blogEntry,
  title: 'Blog',
  type: 'document',
  fields: [
    {
      title: 'SEO Data',
      name: 'seo',
      type: objectTypes.seo,
    },
    {
      name: 'title',
      title: 'Blog Entry Title',
      type: objectTypes.string,
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: objectTypes.slug,
      options: {
        source: 'title',
        maxLength: 100,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 100),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Publish date',
      name: 'publishDate',
      type: objectTypes.date,
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Preview Text',
      name: 'preview',
      type: objectTypes.text,
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Text',
      name: 'text',
      type: objectTypes.array,
      of: [
        {
          type: objectTypes.block,
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'internalLink',
                type: 'object',
                icon: LinkIcon,
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [
                      {
                        type: 'blogEntry',
                      },
                    ],
                  },
                ],
              },
              {
                title: 'External Link',
                name: 'externalLink',
                type: 'object',
                icon: EarthGlobeIcon,
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule: any) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['https', 'http', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          name: 'image',
          title: 'Image',
          fields: [
            {
              type: 'string',
              name: 'alt',
              title: 'Alt Text',
            },
          ],
        },
        {
          name: 'code',
          title: 'Code Block',
          type: 'code',
          options: {
            theme: 'monokai',
          },
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Main Image',
      name: 'mainImage',
      type: objectTypes.image,
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: objectTypes.tag}]}],
      options: {
        disableNew: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
