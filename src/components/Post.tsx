import * as React from "react";
import { css } from "@emotion/core";
import tw from "twin.macro";
import { MDXRenderer } from "gatsby-plugin-mdx";
import media from "../styles/customMediaQuery";
import Navigation from "./Navigation";
import PostTagList from "./PostTagList";
import Share from "./Share";
import {
  Maybe,
  MdxFrontmatter,
  Scalars,
  SitePageContext,
} from "../../types/graphql-types";

type Props = {
  frontmatter?: Maybe<MdxFrontmatter>;
  body?: Scalars["String"];
  pageContext: SitePageContext;
};

const container = css`
  ${tw`w-full`}
`;

const titleText = css`
  ${tw`mb-2 font-semibold text-4xl text-gray-800 leading-snug`}

  ${media.phone} {
    ${tw`text-2xl`};
  }
`;

const dateText = css`
  ${tw`text-base mb-2`}
`;

const Post: React.FC<Props> = ({ body, frontmatter, pageContext }) => {
  const { title, date, tags, path } = frontmatter;
  const previousPost = pageContext.previous;
  const nextPost = pageContext.next;
  const previousPagePath = previousPost && previousPost.frontmatter.path;
  const previousLabel = previousPost && previousPost.frontmatter.title;
  const nextPagePath = nextPost && nextPost.frontmatter.path;
  const nextLabel = nextPost && nextPost.frontmatter.title;
  const isBrowser = typeof window !== `undefined`;

  return (
    <div css={container}>
      <p css={titleText}>{title}</p>
      <p css={dateText}>{date}</p>
      <PostTagList tags={tags} />
      <div className="post">
        <MDXRenderer>{body}</MDXRenderer>
      </div>
      <Share
        url={isBrowser ? `${location.origin}${path}` : ""}
        title={title}
        tags={tags}
      />
      <Navigation
        previousPagePath={previousPagePath}
        previousLabel={previousLabel}
        nextPagePath={nextPagePath}
        nextLabel={nextLabel}
      />
    </div>
  );
};

export default Post;