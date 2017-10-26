// @flow

export type CategoryMember = {
  pageid: number,
  ns: number,
  title: string
};

export const getInsuranceCategories = (categoryMembers: Array<CategoryMember>) : Array<string> => {
  
  return categoryMembers.map((categoryMember: CategoryMember) => {
    return categoryMember.title.slice(9);
  });
};

export const categoriesUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Types_of_insurance&cmtype=subcat&format=json&origin=*';
