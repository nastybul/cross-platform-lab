import { servicesData } from '../data.js';
import { 
  Section, SectionTitle, SectionText, FilterGroup, FilterButton, 
  ServicesGrid, ServiceCard, ServiceName, ServicePrice, ServiceDesc, SelectServiceButton 
} from './HomeView.styles.js';

export const HomeView = ({ selectedCategory, setSelectedCategory, onSelectService }) => {
  return (
    <div>
      <Section $mb="32px">
        <SectionTitle>Про застосунок та основні функції</SectionTitle>
        <SectionText>
          Вебзастосунок <strong>DentalClinic</strong> призначений для зручного та швидкого онлайн-запису пацієнтів на прийом до стоматолога, ознайомлення з каталогом послуг та вибору відповідного спеціаліста.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Каталог послуг</SectionTitle>
        <SectionText $mb="24px">Оберіть категорію, щоб переглянути доступні процедури, їх вартість та опис:</SectionText>

        <FilterGroup>
          {[
            { id: 'all', label: 'Усі послуги' },
            { id: 'therapy', label: 'Терапія' },
            { id: 'orthodontics', label: 'Ортодонтія' },
            { id: 'hygiene', label: 'Чистка та відбілювання' },
            { id: 'pediatric', label: 'Дитяча стоматологія' }
          ].map(cat => (
            <FilterButton
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              $isActive={selectedCategory === cat.id}
            >
              {cat.label}
            </FilterButton>
          ))}
        </FilterGroup>

        <ServicesGrid>
          {servicesData
            .filter(s => {
              if (selectedCategory === 'pediatric') return s.category === 'pediatric';
              if (selectedCategory === 'all') return true;
              return s.category === selectedCategory || s.name === 'Консультація';
            })
            .map(service => (
              <ServiceCard key={service.id}>
                <div>
                  <ServiceName>{service.name}</ServiceName>
                  <ServicePrice>{service.price}</ServicePrice>
                  <ServiceDesc>{service.desc}</ServiceDesc>
                </div>
                <SelectServiceButton onClick={() => onSelectService(service.name)}>
                  Обрати для запису
                </SelectServiceButton>
              </ServiceCard>
            ))}
        </ServicesGrid>
      </Section>
    </div>
  );
};