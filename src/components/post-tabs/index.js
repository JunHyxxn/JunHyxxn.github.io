import React, { useMemo } from 'react';
import { Tabs, Tab } from '@mui/material';
import PostCardColumn from '../post-card-column';
import './style.scss';

function PostTabs({ tabIndex, onChange, tabs, posts, showMoreButton }) {
  const tabPosts = useMemo(() => {
    // 최근 post 11개
    if (tabs[tabIndex] === 'All') return posts;
    return posts.filter((post) => post.categories.includes(tabs[tabIndex]));
  }, [posts, tabs, tabIndex]);
  console.log(tabs);
  return (
    <div className="post-tabs-wrapper">
      <div className="post-tabs">
        <Tabs
          className="mui-tabs"
          value={tabIndex}
          onChange={onChange}
          variant="scrollable"
          scrollButtons="auto" // 모든 카테고리 표현
        >
          {tabs.map((title, index) => (
            <Tab label={title} key={index} />
          ))}
        </Tabs>
      </div>
      <PostCardColumn
        posts={showMoreButton ? tabPosts.slice(0, 5) : tabPosts}
        showMoreButton={showMoreButton && tabPosts.length > 5}
        moreUrl={`posts/${tabIndex === 0 ? '' : tabs[tabIndex]}`}
      />
    </div>
  );
}
export default PostTabs;
