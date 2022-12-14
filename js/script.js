{
  const  optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.sidebar .tags',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.sidebar .authors'

    const templates = {
      articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
      tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
      authorsListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
    };

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    let hrefAttribute = clickedElement.getAttribute('href');
    const deletingHashtag = 1;
    hrefAttribute = hrefAttribute.substring(deletingHashtag);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const rightArticle = document.getElementById(hrefAttribute);

    /* [DONE] add class 'active' to the correct article */
    rightArticle.classList.add('active');
  };

  const generateTitleLinks = function(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    /* for each article */
    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  const calculateTagsParams = function(tags){
    const params = {max: 0, min: 999999};
    for(let tag in tags){
      if (tags[tag]>params.max){
        params.max = tags[tag];
      }
      if (tags[tag]<params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

  const calculateTagClass = function(count, params){
    const differenceOfMaxAndMin = params.max - params.min;
    const distanceFromMin = count - params.min;
    const percentage = distanceFromMin / differenceOfMaxAndMin;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  }

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTMLData = {id: 'tag-' + tag, title: tag};
        const linkHTML = templates.articleLink(linkHTMLData);
        /* add generated code to html variable */
        html= html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
            allTags[tag]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
    const tagList = document.querySelector(optTagsListSelector);
    /*tagList.innerHTML = allTags.join(' ');*/
    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] create variable for all links HTML code */
    const allTagsData = {tags: []};
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
       /* [NEW] generate code of a link and add it to allTagsHTML */
       allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const firstRightStringOfTag = 5;
    const tag = href.substring(firstRightStringOfTag);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let equalTagLink of equalTagLinks){
      /* add class active */
      equalTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.list-horizontal a');
    /* START LOOP: for each link */
    for(let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  const generateAuthors = function(){
    let allAuthors = {};
    const authorsList = document.querySelector(optAuthorsListSelector);
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      const articleAuthor = article.getAttribute('data-author');
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
      const linkHTMLData = {id: 'author-' + articleAuthor, title: articleAuthor};
      const linkHTML = templates.articleLink(linkHTMLData);
      authorsWrapper.innerHTML = linkHTML;
      if(!allAuthors[articleAuthor]){
          allAuthors[articleAuthor] = 1;
        } else {
            allAuthors[articleAuthor]++;
        }
    }
    const allAuthorsData = {authors: []};
    for(let author in allAuthors){
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author]
      });
    }
    console.log(allAuthorsData);
    authorsList.innerHTML = templates.authorsListLink(allAuthorsData);
  }

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const correctClickedElement = clickedElement.querySelector('a');
    const href = correctClickedElement.getAttribute('href');
    const firstRightStringOfAuthor = 8;
    const author = href.substring(firstRightStringOfAuthor);
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for(let activeAuthorLink of activeAuthorLinks){
      activeAuthorLink.classList.remove('active');
    }
    const equalAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for(let equalAuthorLink of equalAuthorLinks){
      equalAuthorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    const authorsLinks = document.querySelectorAll(optArticleAuthorSelector);
    for(let authorsLink of authorsLinks){
      authorsLink.addEventListener('click', authorClickHandler);
    }
  }

  generateTitleLinks();

  generateTags();
  
  addClickListenersToTags();

  generateAuthors();

  addClickListenersToAuthors();
}