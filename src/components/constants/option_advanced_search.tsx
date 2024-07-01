import React from 'react'

const useOptions = () => {
  const optionState = [
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'Updating',
      value: 'Đang Cập Nhật',
    },
    {
      name: 'Complete',
      value: 'Hoàn Thành',
    },
  ]


  const optionNumChapter = [
    {
      name: '> 0',
      value: '0'
    },
    {
      name: '>= 50',
      value: '50'
    },
    {
      name: '>= 100',
      value: '100'
    },
    {
      name: '>= 200',
      value: '200'
    },
    {
      name: '>= 300',
      value: '300'
    },
    {
      name: '>= 400',
      value: '400'
    },
    {
      name: '>= 500',
      value: '500'
    }
  ]

  const optionSortBy = [
    {
      name: 'Posting date gradually decreases',
      value: 'create_date_chapter_desc'
    },
    {
      name: 'Posting date gradually increases',
      value: 'create_date_chapter_asc'
    },
    {
      name: 'Update date gradually decreases',
      value: 'last_modified_date_chapter_desc'
    },
    {
      name: 'Update date gradually increases',
      value: 'last_modified_date_chapter_asc'
    },
    {
      name: 'Views gradually decrease',
      value: 'views_desc'
    },
    {
      name: 'Views gradually increases',
      value: 'views_asc'
    },
  ]

  return {optionState, optionNumChapter, optionSortBy}
}

export default useOptions