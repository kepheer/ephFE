<template>
  <Head>
    <Title>ЭФИР – музыкальный лейбл</Title>
    <Meta
      name="description"
      content="С вас — искусство, с нас — всё остальное. Лейбл, который понимает, как много значит музыка."
    />
  </Head>

  <div class="px-5 sm:px-4 lg:px-16">
    <section class="h-screen">
      <div class="flex flex-col items-center text-center justify-center h-3/4">
        <h1 class="font-head font-extrabold text-3xl md:text-6xl">
          С ВАС —
          <span class="text-gradient"> ИСКУССТВО</span>
        </h1>
        <h3 class="font-head font-bold text-eph-gray-light text-lg md:text-3xl">
          с нас — всё остальное
        </h3>
      </div>
    </section>

    <section
      id="offer"
      class="sm:h-full md:h-[88dvh] flex sm:flex-row items-center justify-between lg:gap-48 ease-in-out"
    >
      <div class="text-md text-eph-gray-light lg:text-lg text-balance">
        <p
          v-animateonscroll="{
            enterClass: 'animate-fadein',
            leaveClass: 'animate-fadeout',
          }"
          class="duration-1000"
        >
          Последнее, о чём хочется думать, когда ты творишь музыку — это
          <b>волокита</b> с её выпуском.
          <strong class="font-normal">Найти агрегатора или лейбл</strong>,
          подать заявку, дождаться положительного ответа, заполнить огромную
          форму для отправки релиза с десятками полей технической информации,
          пройти модерацию, составить пресс-кит, самостоятельно
          <strong class="font-normal">питчить релиз</strong>... А ведь есть
          занятия <b>куда приятнее</b>: общаться с аудиторией, прогревать её к
          релизу, снимать сопроводительный контент, наконец, сочинять новые
          песни или даже работать над альбомом.
        </p>
        <br />
        <p
          v-animateonscroll="{
            enterClass: 'animate-fadein',
            leaveClass: 'animate-fadeout',
          }"
          class="duration-1500"
        >
          Мы сами проходили через всё это и знаем, сколько сил и бесценного
          времени это занимает. Поэтому мы берем на себя всю работу по
          <strong>доставке вашей музыки</strong> максимально широкой аудитории.
          Качество этой аудитории вы определяете сами, выпуская новые релизы и
          выстраивая свою коммуникацию с поклонниками.
        </p>
      </div>
      <div class="absolute sm:static lg:basis-2/4">
        <AnimationCube
          v-animateonscroll="{
            enterClass: 'animate-fadein',
            leaveClass: 'animate-fadeout',
          }"
          class="duration-1500 sm:-m-16 md:m-0 sm:h-[50dvh] md:h-auto blur-sm sm:blur-none md:blur-xs lg:blur-none opacity-20 sm:opacity-100 md:opacity-20 lg:opacity-100"
        />
      </div>
    </section>

    <section id="finances" class="mt-[12dvh] pt-12 mb-8 ease-in-out">
      <div
        class="flex flex-col sm:flex-row items-start md:items-center sm:gap-4 lg:gap-8 mb-4"
      >
        <h2
          v-animateonscroll="{
            enterClass: 'animate-fadein',
            leaveClass: 'animate-fadeout',
          }"
          class="section-title text-left duration-1000"
        >
          БУДЕМ
          <span class="text-gradient"> ЧЕСТНЫ</span>
        </h2>

        <div class="text-md text-eph-gray-light lg:text-lg text-balance">
          <p
            v-animateonscroll="{
              enterClass: 'animate-fadein',
              leaveClass: 'animate-fadeout',
            }"
            class="duration-1000"
          >
            <b>В подавляющем большинстве</b>
            <strong class="font-normal"> лейблы</strong>
            либо стараются вас заколотить в свои контент-планы, заставляют
            снимать унизительно-бессмысленные короткие ролики и работать в
            режиме конвейера «один месяц — один релиз», либо рассматривают ваше
            творчество как цифру в каталоге и финансовом отчёте, поэтому
            <b> вы безразличны им</b>. Они заберут у вас несопоставимо огромные
            проценты (как правило, от 40 до 80), в некоторых случаях попросят
            ничем не обоснованную фиксированную оплату за отгрузку. Всё это —
            <b>деньги, украденные у вас</b>.
          </p>
        </div>
      </div>
      <div class="text-md text-eph-gray-light lg:text-lg text-left mb-4">
        <p
          v-animateonscroll="{
            enterClass: 'animate-fadein',
            leaveClass: 'animate-fadeout',
          }"
          class="duration-1500"
        >
          <strong class="font-normal"
            >Мы работаем с артистами на
            <b>максимально комфортном индивидуальном проценте</b></strong
          >
          и даже готовы пересматривать его раз в год — потому что
          <strong>вы важнее стандартных договоров</strong>.
        </p>
      </div>
      <div
        class="flex flex-col sm:flex-row items-start md:items-center sm:gap-4 lg:gap-8"
      >
        <div class="text-md text-eph-gray-light lg:text-lg order-2 sm:order-1">
          <p
            v-animateonscroll="{
              enterClass: 'animate-fadein',
              leaveClass: 'animate-fadeout',
            }"
            class="duration-1000"
          >
            Нам важна ваша <strong>оригинальность</strong> и
            <strong>аутентичность</strong>. Мы ищем тех, кто готов быть собой —
            без масок, без шаблонов. Мы не принимаем бесконечные копии копий
            «про сучек и тачки», но в то же время <b>приветствуем</b>, если это
            сделано <strong>необычно</strong>.
          </p>
        </div>

        <h2
          v-animateonscroll="{
            enterClass: 'animate-fadein',
            leaveClass: 'animate-fadeout',
          }"
          class="section-title text-left duration-1000 order-1 sm:order-2"
        >
          ЗА ЧТО МЫ ВАС
          <span class="text-gradient"> ЛЮБИМ</span>
        </h2>
      </div>
    </section>

    <section id="platforms" class="mb-8 ease-in-out">
      <h2
        v-animateonscroll="{
          enterClass: 'animate-fadein',
          leaveClass: 'animate-fadeout',
        }"
        class="text-center section-title md:mb-1 lg:mb-3 duration-1500"
      >
        ВАС
        <span class="text-gradient"> УСЛЫШАТ</span>
      </h2>
      <p
        v-animateonscroll="{
          enterClass: 'animate-fadein',
          leaveClass: 'animate-fadeout',
        }"
        class="text-eph-gray-light text-center text-md lg:text-2xl duration-1500"
      >
        Мы не просто
        <strong class="font-normal">размещаем треки на платформах</strong>, мы
        делаем так, чтобы вас было
        <strong>легко найти, сложно потерять и невозможно забыть</strong>.
      </p>
      <div class="w-full pb-4">
        <LazyAnimationShine />
        <p
          v-animateonscroll="{
            enterClass: 'animate-fadein',
            leaveClass: 'animate-fadeout',
          }"
          class="text-eph-gray-light/70 text-center text-sm lg:text-lg duration-1500"
        >
          и <b>десятки</b> других площадок по всему миру
        </p>
      </div>
    </section>

    <section id="our-platform" class="mb-8 flex ease-in-out overflow-hidden">
      <div class="flex flex-col md:flex-row md:gap-6 lg:gap-12">
        <div class="lg:w-3/5">
          <h2
            v-animateonscroll="{
              enterClass: 'animate-fadein',
              leaveClass: 'animate-fadeout',
            }"
            class="section-title duration-1000"
          >
            МЫ С
            <span class="text-gradient"> ВАМИ</span>
          </h2>

          <div class="text-md text-eph-gray-light lg:text-lg text-balance">
            <p
              v-animateonscroll="{
                enterClass: 'animate-fadein',
                leaveClass: 'animate-fadeout',
              }"
              class="duration-1000"
            >
              Забудьте про неудобные личные кабинеты и медленную техподдержку.
              Никаких огромных форм для отправки релиза — только самое
              необходимое. Мы регулярно обновляем платформу
              <strong>ЭФИР lab</strong>, добавляя новые возможности и
              функционал. Даже если вам не хватит его — мы, как и вы, живём
              мессенджерами, поэтому всегда <b>вся команда на связи</b> в вашем
              чате <b>Telegram</b>.
            </p>
          </div>
        </div>
        <div
          v-animateonscroll="{
            enterClass: 'animate-fadein',
            leaveClass: 'animate-fadeout',
          }"
          class="order-first md:order-last duration-1500"
        >
          <img
            src="/images/labmockup.png"
            alt="ЭФИР lab"
            loading="lazy"
            class="object-cover object-left drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  </div>
</template>
