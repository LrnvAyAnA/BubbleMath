import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FirestoreDB } from './firebase';


export const getAllLesson = async ({classPath}) => {
    try {
      const sectionsRef = collection(FirestoreDB, 'Class', classPath, 'Section');
      const sectionsSnapshot = await getDocs(sectionsRef);
      const sections = sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const allData = [];   
      for (const section of sections) {
        allData.push({ id: section.id, type: 'section', name: section.sectionName, numberSection: section.numberSection });

        const lessonRef = collection(FirestoreDB, 'Class', classPath, 'Section', section.id, 'Lesson');
        const lessonSnapshot = await getDocs(lessonRef);
        const lessonData = lessonSnapshot.docs.map(doc => ({ id: doc.id, sectionId:section.id, 
                                                              sectionNum: section.numberSection,
                                                              type: 'lesson', ...doc.data() }));
        lessonData.sort((a, b) => a.lessonNumber.localeCompare(b.lessonNumber));
        allData.push(...lessonData);
      }
      return allData;

    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  export const getTheoryFromLesson = async ({ classPath, lesson }) => {
    try {
      const dataTheory = [];
      const sectionId = lesson?.sectionId;
      const theoryRef = collection(FirestoreDB, 'Class', classPath, 'Section', sectionId, 'Lesson', lesson.id, 'Theory');
      const theorySnapshot = await getDocs(theoryRef);
      const theoryPages = theorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dataTheory.push(...theoryPages);
      return dataTheory;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  