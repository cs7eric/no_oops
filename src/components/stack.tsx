import React from "react";

interface Props {
  stackItem: any
}

const SkillStack:React.FC<Props> = ({stackItem}) => {

  return (
    <>
      <div className="stack flex flex-col items-center py-2 dark:bg-black bg-white   rounded-lg  justify-center">
        <img
          src={stackItem.href} alt=""
          className={'size-8 sm:size-10 '}
        />
        <h3 className={'text-xs sm:text-sm'}>{stackItem.label}</h3>
      </div>
    </>
  )

}

export default SkillStack