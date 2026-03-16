// Экспорт всех данных для классов
import { Subject, SubjectData, GameLesson } from './types'

// Импорт данных из новой структуры grades/{grade}/{subject}/
// Grade 0
import { lessons as grade0World } from './grades/0/world'
import { lessons as grade0Math } from './grades/0/math'
import { lessons as grade0Reading } from './grades/0/reading'
import { lessons as grade0Russian } from './grades/0/russian'
import { lessons as grade0Music } from './grades/0/music'
import { lessons as grade0Art } from './grades/0/art'
import { lessons as grade0PE } from './grades/0/pe'
import { lessons as grade0Craft } from './grades/0/craft'
import { games as grade0WorldGames } from './grades/0/world'

// Grade 1
import { lessons as grade1Russian } from './grades/1/russian'
import { lessons as grade1Literature } from './grades/1/literature'
import { lessons as grade1Math } from './grades/1/math'
import { lessons as grade1World } from './grades/1/world'
import { lessons as grade1English } from './grades/1/english'
import { lessons as grade1Tech } from './grades/1/tech'
import { lessons as grade1Art } from './grades/1/art'
import { lessons as grade1Music } from './grades/1/music'
import { lessons as grade1PE } from './grades/1/pe'
import { lessons as grade1Reading } from './grades/1/reading'
import { games as grade1RussianGames } from './grades/1/russian'
import { games as grade1MathGames } from './grades/1/math'
import { games as grade1WorldGames } from './grades/1/world'
import { games as grade1EnglishGames } from './grades/1/english'
import { games as grade1ReadingGames } from './grades/1/reading'

// Grade 2
import { lessons as grade2Russian } from './grades/2/russian'
import { lessons as grade2Literature } from './grades/2/literature'
import { lessons as grade2Math } from './grades/2/math'
import { lessons as grade2World } from './grades/2/world'
import { lessons as grade2English } from './grades/2/english'
import { lessons as grade2Tech } from './grades/2/tech'
import { lessons as grade2Art } from './grades/2/art'
import { lessons as grade2Music } from './grades/2/music'
import { lessons as grade2PE } from './grades/2/pe'
import { lessons as grade2Projects } from './grades/2/projects'
import { games as grade2RussianGames } from './grades/2/russian'
import { games as grade2LiteratureGames } from './grades/2/literature'
import { games as grade2MathGames } from './grades/2/math'
import { games as grade2WorldGames } from './grades/2/world'
import { games as grade2EnglishGames } from './grades/2/english'
import { games as grade2ProjectsGames } from './grades/2/projects'

// Grade 3
import { lessons as grade3Russian } from './grades/3/russian'
import { lessons as grade3Literature } from './grades/3/literature'
import { lessons as grade3Math } from './grades/3/math'
import { lessons as grade3World } from './grades/3/world'
import { lessons as grade3English } from './grades/3/english'
import { lessons as grade3Tech } from './grades/3/tech'
import { lessons as grade3Art } from './grades/3/art'
import { lessons as grade3Music } from './grades/3/music'
import { lessons as grade3PE } from './grades/3/pe'
import { lessons as grade3Robotics } from './grades/3/robotics'
import { lessons as grade3Ethics } from './grades/3/ethics'
import { lessons as grade3Informatics } from './grades/3/informatics'
import { lessons as grade3Safety } from './grades/3/safety'
import { games as grade3RoboticsGames } from './grades/3/robotics'
import { games as grade3EthicsGames } from './grades/3/ethics'
import { games as grade3InformaticsGames } from './grades/3/informatics'
import { games as grade3SafetyGames } from './grades/3/safety'


// Grade 4
import { lessons as grade4Russian } from './grades/4/russian'
import { lessons as grade4Literature } from './grades/4/literature'
import { lessons as grade4Math } from './grades/4/math'
import { lessons as grade4World } from './grades/4/world'
import { lessons as grade4English } from './grades/4/english'
import { lessons as grade4Religion } from './grades/4/religion'
import { lessons as grade4Tech } from './grades/4/tech'
import { lessons as grade4Art } from './grades/4/art'
import { lessons as grade4Music } from './grades/4/music'
import { lessons as grade4PE } from './grades/4/pe'
import { lessons as grade4Projects } from './grades/4/projects'
import { lessons as grade4History } from './grades/4/history'
import { lessons as grade4Geography } from './grades/4/geography'
import { lessons as grade4Informatics } from './grades/4/informatics'
import { lessons as grade4Nature } from './grades/4/nature'
import { games as grade4WorldGames } from './grades/4/world'
import { games as grade4MathGames } from './grades/4/math'
import { games as grade4RussianGames } from './grades/4/russian'
import { games as grade4LiteratureGames } from './grades/4/literature'
import { games as grade4EnglishGames } from './grades/4/english'
import { games as grade4ProjectsGames } from './grades/4/projects'
import { games as grade4HistoryGames } from './grades/4/history'
import { games as grade4GeographyGames } from './grades/4/geography'
import { games as grade4InformaticsGames } from './grades/4/informatics'
import { games as grade4NatureGames } from './grades/4/nature'

// Grade 5
import { lessons as grade5Russian } from './grades/5/russian'
import { lessons as grade5Literature } from './grades/5/literature'
import { lessons as grade5Math } from './grades/5/math'
import { lessons as grade5History } from './grades/5/history'
import { lessons as grade5Biology } from './grades/5/biology'
import { lessons as grade5Geography } from './grades/5/geography'
import { lessons as grade5English } from './grades/5/english'
import { lessons as grade5Tech } from './grades/5/tech'
import { lessons as grade5Art } from './grades/5/art'
import { lessons as grade5Music } from './grades/5/music'
import { lessons as grade5PE } from './grades/5/pe'
import { lessons as grade5Safety } from './grades/5/safety'
import { lessons as grade5Crafts } from './grades/5/crafts'
import { lessons as grade5Finance } from './grades/5/finance'
import { lessons as grade5Digital } from './grades/5/digital'
import { lessons as grade5Informatics } from './grades/5/informatics'
import { lessons as grade5Robotics } from './grades/5/robotics'
import { games as grade5MathGames } from './grades/5/math'
import { games as grade5HistoryGames } from './grades/5/history'
import { games as grade5BiologyGames } from './grades/5/biology'
import { games as grade5GeographyGames } from './grades/5/geography'
import { games as grade5EnglishGames } from './grades/5/english'
import { games as grade5RussianGames } from './grades/5/russian'
import { games as grade5LiteratureGames } from './grades/5/literature'
import { games as grade5CraftsGames } from './grades/5/crafts'
import { games as grade5FinanceGames } from './grades/5/finance'
import { games as grade5DigitalGames } from './grades/5/digital'
import { games as grade5InformaticsGames } from './grades/5/informatics'
import { games as grade5RoboticsGames } from './grades/5/robotics'

// Grade 6
import { lessons as grade6Russian } from './grades/6/russian'
import { lessons as grade6Literature } from './grades/6/literature'
import { lessons as grade6Math } from './grades/6/math'
import { lessons as grade6History } from './grades/6/history'
import { lessons as grade6Biology } from './grades/6/biology'
import { lessons as grade6Geography } from './grades/6/geography'
import { lessons as grade6English } from './grades/6/english'
import { lessons as grade6Tech } from './grades/6/tech'
import { lessons as grade6Art } from './grades/6/art'
import { lessons as grade6Music } from './grades/6/music'
import { lessons as grade6PE } from './grades/6/pe'
import { lessons as grade6Safety } from './grades/6/safety'
import { lessons as grade6Social } from './grades/6/social'
import { lessons as grade6Informatics } from './grades/6/informatics'
import { lessons as grade6Robotics } from './grades/6/robotics'
import { lessons as grade6Ecology } from './grades/6/ecology'
import { lessons as grade6Coding } from './grades/6/coding'
import { lessons as grade6Physics } from './grades/6/physics'
import { lessons as grade6Chemistry } from './grades/6/chemistry'
import { lessons as grade6Crafts } from './grades/6/crafts'
import { games as grade6MathGames } from './grades/6/math'
import { games as grade6HistoryGames } from './grades/6/history'
import { games as grade6BiologyGames } from './grades/6/biology'
import { games as grade6GeographyGames } from './grades/6/geography'
import { games as grade6EnglishGames } from './grades/6/english'
import { games as grade6RussianGames } from './grades/6/russian'
import { games as grade6LiteratureGames } from './grades/6/literature'
import { games as grade6SocialGames } from './grades/6/social'
import { games as grade6InformaticsGames } from './grades/6/informatics'
import { games as grade6RoboticsGames } from './grades/6/robotics'
import { games as grade6EcologyGames } from './grades/6/ecology'
import { games as grade6CodingGames } from './grades/6/coding'
import { games as grade6PhysicsGames } from './grades/6/physics'
import { games as grade6ChemistryGames } from './grades/6/chemistry'
import { games as grade6CraftsGames } from './grades/6/crafts'

// Grade 7
import { lessons as grade7Russian } from './grades/7/russian'
import { lessons as grade7Literature } from './grades/7/literature'
import { lessons as grade7Algebra } from './grades/7/algebra'
import { lessons as grade7Geometry } from './grades/7/geometry'
import { lessons as grade7Physics } from './grades/7/physics'
import { lessons as grade7History } from './grades/7/history'
import { lessons as grade7Biology } from './grades/7/biology'
import { lessons as grade7Geography } from './grades/7/geography'
import { lessons as grade7English } from './grades/7/english'
import { lessons as grade7Tech } from './grades/7/tech'
import { lessons as grade7Art } from './grades/7/art'
import { lessons as grade7Music } from './grades/7/music'
import { lessons as grade7PE } from './grades/7/pe'
import { lessons as grade7Safety } from './grades/7/safety'
import { lessons as grade7Coding } from './grades/7/coding'
import { lessons as grade7Social } from './grades/7/social'
import { lessons as grade7Ecology } from './grades/7/ecology'
import { lessons as grade7Robotics } from './grades/7/robotics'
import { lessons as grade7Chemistry } from './grades/7/chemistry'
import { lessons as grade7Informatics } from './grades/7/informatics'
import { games as grade7AlgebraGames } from './grades/7/algebra'
import { games as grade7GeometryGames } from './grades/7/geometry'
import { games as grade7PhysicsGames } from './grades/7/physics'
import { games as grade7HistoryGames } from './grades/7/history'
import { games as grade7BiologyGames } from './grades/7/biology'
import { games as grade7GeographyGames } from './grades/7/geography'
import { games as grade7EnglishGames } from './grades/7/english'
import { games as grade7RussianGames } from './grades/7/russian'
import { games as grade7LiteratureGames } from './grades/7/literature'
import { games as grade7CodingGames } from './grades/7/coding'
import { games as grade7SocialGames } from './grades/7/social'
import { games as grade7EcologyGames } from './grades/7/ecology'
import { games as grade7RoboticsGames } from './grades/7/robotics'
import { games as grade7ChemistryGames } from './grades/7/chemistry'
import { games as grade7InformaticsGames } from './grades/7/informatics'

// Grade 8
import { lessons as grade8Russian } from './grades/8/russian'
import { lessons as grade8Literature } from './grades/8/literature'
import { lessons as grade8Algebra } from './grades/8/algebra'
import { lessons as grade8Geometry } from './grades/8/geometry'
import { lessons as grade8Physics } from './grades/8/physics'
import { lessons as grade8Chemistry } from './grades/8/chemistry'
import { lessons as grade8History } from './grades/8/history'
import { lessons as grade8Biology } from './grades/8/biology'
import { lessons as grade8Geography } from './grades/8/geography'
import { lessons as grade8English } from './grades/8/english'
import { lessons as grade8Tech } from './grades/8/tech'
import { lessons as grade8Art } from './grades/8/art'
import { lessons as grade8Music } from './grades/8/music'
import { lessons as grade8PE } from './grades/8/pe'
import { lessons as grade8Safety } from './grades/8/safety'
import { lessons as grade8Coding } from './grades/8/coding'
import { lessons as grade8Social } from './grades/8/social'
import { lessons as grade8Economy } from './grades/8/economy'
import { lessons as grade8Informatics } from './grades/8/informatics'
import { lessons as grade8Robotics } from './grades/8/robotics'
import { lessons as grade8Law } from './grades/8/law'
import { games as grade8PhysicsGames } from './grades/8/physics'
import { games as grade8CodingGames } from './grades/8/coding'
import { games as grade8SocialGames } from './grades/8/social'
import { games as grade8EconomyGames } from './grades/8/economy'
import { games as grade8InformaticsGames } from './grades/8/informatics'
import { games as grade8RoboticsGames } from './grades/8/robotics'
import { games as grade8LawGames } from './grades/8/law'

// Grade 9
import { lessons as grade9Russian } from './grades/9/russian'
import { lessons as grade9Literature } from './grades/9/literature'
import { lessons as grade9Algebra } from './grades/9/algebra'
import { lessons as grade9Geometry } from './grades/9/geometry'
import { lessons as grade9Physics } from './grades/9/physics'
import { lessons as grade9Chemistry } from './grades/9/chemistry'
import { lessons as grade9History } from './grades/9/history'
import { lessons as grade9Biology } from './grades/9/biology'
import { lessons as grade9Geography } from './grades/9/geography'
import { lessons as grade9English } from './grades/9/english'
import { lessons as grade9Tech } from './grades/9/tech'
import { lessons as grade9Art } from './grades/9/art'
import { lessons as grade9Music } from './grades/9/music'
import { lessons as grade9PE } from './grades/9/pe'
import { lessons as grade9Safety } from './grades/9/safety'
import { lessons as grade9Social } from './grades/9/social'
import { lessons as grade9Coding } from './grades/9/coding'
import { lessons as grade9Informatics } from './grades/9/informatics'
import { lessons as grade9Psychology } from './grades/9/psychology'
import { lessons as grade9Economy } from './grades/9/economy'
import { lessons as grade9Career } from './grades/9/career'
import { lessons as grade9OGE } from './grades/9/oge'
import { games as grade9AlgebraGames } from './grades/9/algebra'
import { games as grade9GeometryGames } from './grades/9/geometry'
import { games as grade9PhysicsGames } from './grades/9/physics'
import { games as grade9ChemistryGames } from './grades/9/chemistry'
import { games as grade9BiologyGames } from './grades/9/biology'
import { games as grade9GeographyGames } from './grades/9/geography'
import { games as grade9HistoryGames } from './grades/9/history'
import { games as grade9RussianGames } from './grades/9/russian'
import { games as grade9LiteratureGames } from './grades/9/literature'
import { games as grade9SocialGames } from './grades/9/social'
import { games as grade9CodingGames } from './grades/9/coding'
import { games as grade9InformaticsGames } from './grades/9/informatics'
import { games as grade9PsychologyGames } from './grades/9/psychology'
import { games as grade9EconomyGames } from './grades/9/economy'
import { games as grade9CareerGames } from './grades/9/career'
import { games as grade9OGEGames } from './grades/9/oge'

// Grade 10
import { lessons as grade10Russian } from './grades/10/russian'
import { lessons as grade10Literature } from './grades/10/literature'
import { lessons as grade10Algebra } from './grades/10/algebra'
import { lessons as grade10Geometry } from './grades/10/geometry'
import { lessons as grade10Physics } from './grades/10/physics'
import { lessons as grade10Chemistry } from './grades/10/chemistry'
import { lessons as grade10History } from './grades/10/history'
import { lessons as grade10Social } from './grades/10/social'
import { lessons as grade10Biology } from './grades/10/biology'
import { lessons as grade10Geography } from './grades/10/geography'
import { lessons as grade10English } from './grades/10/english'
import { lessons as grade10Informatics } from './grades/10/informatics'
import { lessons as grade10PE } from './grades/10/pe'
import { lessons as grade10Safety } from './grades/10/safety'
import { lessons as grade10Economy } from './grades/10/economy'
import { lessons as grade10Coding } from './grades/10/coding'
import { lessons as grade10Tech } from './grades/10/tech'
import { lessons as grade10Art } from './grades/10/art'
import { lessons as grade10Career } from './grades/10/career'
import { lessons as grade10Astronomy } from './grades/10/astronomy'
import { lessons as grade10Business } from './grades/10/business'
import { lessons as grade10Philosophy } from './grades/10/philosophy'
import { lessons as grade10Projects } from './grades/10/projects'
import { lessons as grade10Lab } from './grades/10/lab'
import { lessons as grade10EGE } from './grades/10/ege'
import { games as grade10EconomyGames } from './grades/10/economy'
import { games as grade10CodingGames } from './grades/10/coding'
import { games as grade10TechGames } from './grades/10/tech'
import { games as grade10ArtGames } from './grades/10/art'
import { games as grade10CareerGames } from './grades/10/career'
import { games as grade10AstronomyGames } from './grades/10/astronomy'
import { games as grade10BusinessGames } from './grades/10/business'
import { games as grade10PhilosophyGames } from './grades/10/philosophy'
import { games as grade10ProjectsGames } from './grades/10/projects'
import { games as grade10LabGames } from './grades/10/lab'
import { games as grade10EGEGames } from './grades/10/ege'

// Grade 11
import { lessons as grade11Russian } from './grades/11/russian'
import { lessons as grade11Literature } from './grades/11/literature'
import { lessons as grade11Algebra } from './grades/11/algebra'
import { lessons as grade11Geometry } from './grades/11/geometry'
import { lessons as grade11Physics } from './grades/11/physics'
import { lessons as grade11Chemistry } from './grades/11/chemistry'
import { lessons as grade11History } from './grades/11/history'
import { lessons as grade11Social } from './grades/11/social'
import { lessons as grade11Biology } from './grades/11/biology'
import { lessons as grade11Geography } from './grades/11/geography'
import { lessons as grade11English } from './grades/11/english'
import { lessons as grade11Informatics } from './grades/11/informatics'
import { lessons as grade11PE } from './grades/11/pe'
import { lessons as grade11Safety } from './grades/11/safety'
import { lessons as grade11Economy } from './grades/11/economy'
import { lessons as grade11Coding } from './grades/11/coding'
import { games as grade11EconomyGames } from './grades/11/economy'
import { games as grade11CodingGames } from './grades/11/coding'

// Старые игры из файлов grade-*.ts
import { prepClassGames } from './games/grade-0'
import { firstGradeGames } from './games/grade-1'
import { secondGradeGames } from './grade-2'
import { thirdGradeGames } from './grade-3'
import { fourthGradeGames } from './grade-4'
import { fifthGradeGames } from './grade-5'
import { sixthGradeGames } from './grade-6'
import { seventhGradeGames } from './grade-7'
import { eighthGradeGames } from './grade-8'
import { ninthGradeGames } from './grade-9'
import { tenthGradeGames } from './grade-10'
import { eleventhGradeGames } from './grade-11'

// Предметы для каждого класса
export const grade0Subjects: Subject[] = [grade0World, grade0Math, grade0Reading, grade0Russian, grade0Music, grade0Art, grade0PE, grade0Craft]
export const grade1Subjects: Subject[] = [grade1Russian, grade1Literature, grade1Math, grade1World, grade1English, grade1Tech, grade1Art, grade1Music, grade1PE, grade1Reading]
export const grade2Subjects: Subject[] = [grade2Russian, grade2Literature, grade2Math, grade2World, grade2English, grade2Tech, grade2Art, grade2Music, grade2PE, grade2Projects]
export const grade3Subjects: Subject[] = [grade3Russian, grade3Literature, grade3Math, grade3World, grade3English, grade3Tech, grade3Art, grade3Music, grade3PE, grade3Robotics, grade3Ethics, grade3Informatics, grade3Safety]
export const grade4Subjects: Subject[] = [grade4Russian, grade4Literature, grade4Math, grade4World, grade4English, grade4Religion, grade4Tech, grade4Art, grade4Music, grade4PE, grade4Projects, grade4History, grade4Geography, grade4Informatics, grade4Nature]
export const grade5Subjects: Subject[] = [grade5Russian, grade5Literature, grade5Math, grade5History, grade5Biology, grade5Geography, grade5English, grade5Tech, grade5Art, grade5Music, grade5PE, grade5Safety, grade5Crafts, grade5Finance, grade5Digital, grade5Informatics, grade5Robotics]
export const grade6Subjects: Subject[] = [grade6Russian, grade6Literature, grade6Math, grade6History, grade6Biology, grade6Geography, grade6English, grade6Tech, grade6Art, grade6Music, grade6PE, grade6Safety, grade6Social, grade6Informatics, grade6Robotics, grade6Ecology, grade6Coding, grade6Physics, grade6Chemistry, grade6Crafts]
export const grade7Subjects: Subject[] = [grade7Russian, grade7Literature, grade7Algebra, grade7Geometry, grade7Physics, grade7History, grade7Biology, grade7Geography, grade7English, grade7Tech, grade7Art, grade7Music, grade7PE, grade7Safety, grade7Coding, grade7Social, grade7Ecology, grade7Robotics, grade7Chemistry, grade7Informatics]
export const grade8Subjects: Subject[] = [grade8Russian, grade8Literature, grade8Algebra, grade8Geometry, grade8Physics, grade8Chemistry, grade8History, grade8Biology, grade8Geography, grade8English, grade8Tech, grade8Art, grade8Music, grade8PE, grade8Safety, grade8Coding, grade8Social, grade8Economy, grade8Informatics, grade8Robotics, grade8Law]
export const grade9Subjects: Subject[] = [grade9Russian, grade9Literature, grade9Algebra, grade9Geometry, grade9Physics, grade9Chemistry, grade9History, grade9Biology, grade9Geography, grade9English, grade9Tech, grade9Art, grade9Music, grade9PE, grade9Safety, grade9Social, grade9Coding, grade9Informatics, grade9Psychology, grade9Economy, grade9Career, grade9OGE]
export const grade10Subjects: Subject[] = [grade10Russian, grade10Literature, grade10Algebra, grade10Geometry, grade10Physics, grade10Chemistry, grade10History, grade10Social, grade10Biology, grade10Geography, grade10English, grade10Informatics, grade10PE, grade10Safety, grade10Economy, grade10Coding, grade10Tech, grade10Art, grade10Career, grade10Astronomy, grade10Business, grade10Philosophy, grade10Projects, grade10Lab, grade10EGE]
export const grade11Subjects: Subject[] = [grade11Russian, grade11Literature, grade11Algebra, grade11Geometry, grade11Physics, grade11Chemistry, grade11History, grade11Social, grade11Biology, grade11Geography, grade11English, grade11Informatics, grade11PE, grade11Safety, grade11Economy, grade11Coding]

// Функция получения предметов для класса
export function getSubjectsForGrade(grade: number): Subject[] {
  const subjectsMap: Record<number, Subject[]> = {
    0: grade0Subjects,
    1: grade1Subjects,
    2: grade2Subjects,
    3: grade3Subjects,
    4: grade4Subjects,
    5: grade5Subjects,
    6: grade6Subjects,
    7: grade7Subjects,
    8: grade8Subjects,
    9: grade9Subjects,
    10: grade10Subjects,
    11: grade11Subjects,
  }
  return subjectsMap[grade] || []
}

// Экспорт игр для каждого класса
export { prepClassGames }
export { firstGradeGames }
export { secondGradeGames }
export { thirdGradeGames }
export { fourthGradeGames }
export { fifthGradeGames }
export { sixthGradeGames }
export { seventhGradeGames }
export { eighthGradeGames }
export { ninthGradeGames }
export { tenthGradeGames }
export { eleventhGradeGames }

// Все игры по классам
export const allGames: Record<number, GameLesson[]> = {
  0: prepClassGames,
  1: [...firstGradeGames, ...grade1ReadingGames],
  2: [...secondGradeGames, ...grade2MathGames, ...grade2RussianGames, ...grade2LiteratureGames, ...grade2WorldGames, ...grade2EnglishGames, ...grade2ProjectsGames],
  3: [...thirdGradeGames, ...grade3RoboticsGames, ...grade3EthicsGames, ...grade3InformaticsGames, ...grade3SafetyGames],
  4: [...fourthGradeGames, ...grade4WorldGames, ...grade4MathGames, ...grade4RussianGames, ...grade4LiteratureGames, ...grade4EnglishGames, ...grade4ProjectsGames, ...grade4HistoryGames, ...grade4GeographyGames, ...grade4InformaticsGames, ...grade4NatureGames],
  5: [...fifthGradeGames, ...grade5MathGames, ...grade5HistoryGames, ...grade5BiologyGames, ...grade5GeographyGames, ...grade5EnglishGames, ...grade5RussianGames, ...grade5LiteratureGames, ...grade5CraftsGames, ...grade5FinanceGames, ...grade5DigitalGames, ...grade5InformaticsGames, ...grade5RoboticsGames],
  6: [...sixthGradeGames, ...grade6MathGames, ...grade6HistoryGames, ...grade6BiologyGames, ...grade6GeographyGames, ...grade6EnglishGames, ...grade6RussianGames, ...grade6LiteratureGames, ...grade6SocialGames, ...grade6InformaticsGames, ...grade6RoboticsGames, ...grade6EcologyGames, ...grade6CodingGames, ...grade6PhysicsGames, ...grade6ChemistryGames, ...grade6CraftsGames],
  7: [...seventhGradeGames, ...grade7AlgebraGames, ...grade7GeometryGames, ...grade7PhysicsGames, ...grade7HistoryGames, ...grade7BiologyGames, ...grade7GeographyGames, ...grade7EnglishGames, ...grade7RussianGames, ...grade7LiteratureGames, ...grade7CodingGames, ...grade7SocialGames, ...grade7EcologyGames, ...grade7RoboticsGames, ...grade7ChemistryGames, ...grade7InformaticsGames],
  8: [...eighthGradeGames, ...grade8PhysicsGames, ...grade8CodingGames, ...grade8SocialGames, ...grade8EconomyGames, ...grade8InformaticsGames, ...grade8RoboticsGames, ...grade8LawGames],
  9: [...ninthGradeGames, ...grade9AlgebraGames, ...grade9GeometryGames, ...grade9PhysicsGames, ...grade9ChemistryGames, ...grade9BiologyGames, ...grade9GeographyGames, ...grade9HistoryGames, ...grade9RussianGames, ...grade9LiteratureGames, ...grade9SocialGames, ...grade9CodingGames, ...grade9InformaticsGames, ...grade9PsychologyGames, ...grade9EconomyGames, ...grade9CareerGames, ...grade9OGEGames],
  10: [...tenthGradeGames, ...grade10EconomyGames, ...grade10CodingGames, ...grade10TechGames, ...grade10ArtGames, ...grade10CareerGames, ...grade10AstronomyGames, ...grade10BusinessGames, ...grade10PhilosophyGames, ...grade10ProjectsGames, ...grade10LabGames, ...grade10EGEGames],
  11: [...eleventhGradeGames, ...grade11EconomyGames, ...grade11CodingGames],
}

// Curriculum данные
import { GradeCurriculum } from './types'
import { gradeNames } from './types'

export const gradeCurriculum: GradeCurriculum[] = [
  { grade: 0, title: gradeNames[0], subjects: grade0Subjects },
  { grade: 1, title: gradeNames[1], subjects: grade1Subjects },
  { grade: 2, title: gradeNames[2], subjects: grade2Subjects },
  { grade: 3, title: gradeNames[3], subjects: grade3Subjects },
  { grade: 4, title: gradeNames[4], subjects: grade4Subjects },
  { grade: 5, title: gradeNames[5], subjects: grade5Subjects },
  { grade: 6, title: gradeNames[6], subjects: grade6Subjects },
  { grade: 7, title: gradeNames[7], subjects: grade7Subjects },
  { grade: 8, title: gradeNames[8], subjects: grade8Subjects },
  { grade: 9, title: gradeNames[9], subjects: grade9Subjects },
  { grade: 10, title: gradeNames[10], subjects: grade10Subjects },
  { grade: 11, title: gradeNames[11], subjects: grade11Subjects },
]
