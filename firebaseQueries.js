import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FirestoreDB } from './firebase';


export const getAllLesson = async ({classPath}) => {
  const allData = [];   
    try {
      const sectionsRef = collection(FirestoreDB, 'Class', classPath, 'Section');
      const sectionsSnapshot = await getDocs(sectionsRef);
      const sections = sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

  export const getFromLesson = async ({ classPath, lesson, type }) => {
    try {
      const data = [];
      const sectionId = lesson?.sectionId;
      const ref = collection(FirestoreDB, 'Class', classPath, 'Section', sectionId, 'Lesson', lesson.id, type);
      const snapshot = await getDocs(ref);
      const pages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sortedData = pages.sort((a, b) => a.numberPage.localeCompare(b.numberPage));
      data.push(...sortedData);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//   export const getInfoLesson = async ({ classPath, lesson }) => {
//     try {
//         // Массивы для хранения данных практики, теории и теста
//         const practiceData = [];
//         const theoryData = [];
//         // const testData = [];

//         // Получаем практику
//         const practiceRef = collection(FirestoreDB, 'Class', classPath, 'Section', lesson.sectionId, 'Lesson', lesson.id, 'Practice');
//         const practiceSnapshot = await getDocs(practiceRef);
//         const practicePages = practiceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         const sortedPractice = practicePages.sort((a, b) => a.numberTask.localeCompare(b.numberTask));
//         practiceData.push(...sortedPractice);

//         // Получаем теорию
//         const theoryRef = collection(FirestoreDB, 'Class', classPath, 'Section', lesson.sectionId, 'Lesson', lesson.id, 'Theory');
//         const theorySnapshot = await getDocs(theoryRef);
//         const theoryPages = theorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         const sortedTheory = theoryPages.sort((a, b) => a.numberPage.localeCompare(b.numberPage));
//         theoryData.push(...sortedTheory);

//         // Получаем тест
//         // const testRef = collection(FirestoreDB, 'Class', classPath, 'Section', lesson.sectionId, 'Lesson', lesson.id, 'Test');
//         // const testSnapshot = await getDocs(testRef);
//         // const testPages = testSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         // const sortedTest = testPages.sort(/* Ваш метод сортировки для теста */);
//         // testData.push(...sortedTest);

//         // Возвращаем массив, содержащий массивы данных практики, теории и теста
//         return [practiceData, theoryData];
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error; // Пробрасываем ошибку дальше для обработки в вызывающем коде
//     }
// };
  