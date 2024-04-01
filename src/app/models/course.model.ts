export interface Course {
    title: string;
    credits: string;
    description: string;
    track: string;
    prerequisite: string[] | null;
    details: string;
    tableOfContents: {
      [chapter: string]: {
        title: string;
        subsections: string[];
      };
    };
    image: string;
  }  

export interface CourseCategory {
    basicCourses: Course[];
    intermediateCourses: Course[];
    advancedCourses: Course[];
}