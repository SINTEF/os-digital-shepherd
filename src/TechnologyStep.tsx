import React from 'react';
import { observer } from 'mobx-react';

interface TechnologyStepProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  setStep: (value: number) => void;
}

const TechnologyStep: React.FC<TechnologyStepProps> = observer((props) => {
  const { setStep } = props;

  const content = {
    title: 'AugmentCity GDT',
    paragraphs: [
      {
        text: "The AugmentCity Graphical Digital Twin (GDT) is a digital-twin platform developed by AugmentCity, in Norway. It is the central GDT in the RESIST project, connected to the Digital Shepherd. Placeholder text follows. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem tortor. Suspendisse sagittis dictum euismod. Cras egestas aliquet elit sed auctor. Vivamus a interdum nisi:",
        buttons: [
          { button_text: 'Introduction to AugmentCity Sandbox', url: 'https://vimeo.com/533112900' }
        ]
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit:",
        buttons: [
          { button_text: 'General Use Case', url: 'https://vimeo.com/533112900' },
          { button_text: 'Four Use Cases', url: 'https://vimeo.com/533112900' }
        ]
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem tortor. Suspendisse sagittis dictum euismod. Cras egestas aliquet elit sed auctor. Vivamus a interdum nisi. Nulla a posuere nibh:",
        buttons: [ { button_text: 'Interaction', url: 'https://vimeo.com/533112900' } ]
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem tortor. Suspendisse sagittis dictum euismod. Cras egestas aliquet elit sed auctor. Vivamus a interdum nisi. Nulla a posuere nibh. Nam id finibus ligula. In auctor iaculis risus, nec dapibus felis tincidunt at:",
        buttons: [ { button_text: 'Visualization', url: 'https://vimeo.com/533112900' } ]
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed sem tortor. Suspendisse sagittis dictum euismod. Cras egestas aliquet elit sed auctor. Vivamus a interdum nisi. Nulla a posuere nibh. Nam id finibus ligula.",
        buttons: []
      }
    ]
  };

  const buildEmbedUrl = (raw: string) => {
    const parts = raw.split('/');
    const id = parts[3];
    const hash = parts[4] ? parts[4] : null;
    return hash
      ? `https://player.vimeo.com/video/${id}?h=${hash}`
      : `https://player.vimeo.com/video/${id}`;
  };

  return (
    <fieldset className="flex flex-col gap-4 pt-10 pb-10 pl-[6rem] pr-[6rem] items-center justify-center w-full">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl mb-4">{content.title}</h1>

        {content.paragraphs.map((paragraph, index) => (
          <div key={index} className="p-2 mb-6">
            <p className="mb-4">{paragraph.text}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-6">
              {paragraph.buttons.map((button, buttonIndex) => {
                const embed = buildEmbedUrl(button.url);
                return (
                  <div key={buttonIndex} className="w-full md:w-1/2 lg:w-1/3 flex justify-center">
                    <iframe
                      src={embed}
                      className="w-full max-w-md aspect-video"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={button.button_text}
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className='flex justify-center'>
          <div className='flex flex-col gap-4 mt-10 w-[17rem]'>
            <button className="btn btn-info" onClick={() => setStep(1)}>Previous</button>
            <button className="btn btn-accent" onClick={() => setStep(3)}>Next</button>
          </div>
        </div>
      </div>
    </fieldset>
  );
});

export default TechnologyStep;