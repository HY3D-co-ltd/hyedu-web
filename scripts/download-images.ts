import fs from "fs";
import path from "path";

const BASE_URL = "https://www.hyedu.kr";
const PUBLIC_DIR = path.join(process.cwd(), "public");

const IMAGE_MAP: Array<{ src: string; dest: string }> = [
  // Logo
  {
    src: "/skin/img/logo/logo.jpg",
    dest: "public/images/logo/logo.jpg",
  },

  // Main/Footer
  {
    src: "/skin/img/main/footer-img.png",
    dest: "public/images/main/footer-img.png",
  },
  {
    src: "/skin/img/main/footer_sns01.png",
    dest: "public/images/main/footer_sns01.png",
  },
  {
    src: "/skin/img/main/footer_sns02.png",
    dest: "public/images/main/footer_sns02.png",
  },
  {
    src: "/skin/img/main/footer_sns03.png",
    dest: "public/images/main/footer_sns03.png",
  },
  {
    src: "/skin/img/main/kakao.png",
    dest: "public/images/main/kakao.png",
  },
  {
    src: "/skin/img/main/mail.svg",
    dest: "public/images/main/mail.svg",
  },
  {
    src: "/skin/img/main/naver.png",
    dest: "public/images/main/naver.png",
  },
  {
    src: "/skin/img/main/hyedu_program_2_visit_class.png",
    dest: "public/images/main/hyedu_program_2_visit_class.png",
  },
  {
    src: "/skin/img/main/hyedu_program_3_maker_booth.png",
    dest: "public/images/main/hyedu_program_3_maker_booth.png",
  },
  {
    src: "/skin/img/main/hyedu_program_4_campus_tour.png",
    dest: "public/images/main/hyedu_program_4_campus_tour.png",
  },

  // Program Thumbnails
  {
    src: "/skin/img/sub/new-programai01.png",
    dest: "public/images/programs/new-programai01.png",
  },
  {
    src: "/skin/img/sub/new-programai02.png",
    dest: "public/images/programs/new-programai02.png",
  },
  {
    src: "/skin/img/sub/new-programai03.png",
    dest: "public/images/programs/new-programai03.png",
  },
  {
    src: "/skin/img/sub/new-programai04.png",
    dest: "public/images/programs/new-programai04.png",
  },
  {
    src: "/skin/img/sub/new-programai05.png",
    dest: "public/images/programs/new-programai05.png",
  },
  {
    src: "/skin/img/sub/new-programai06.png",
    dest: "public/images/programs/new-programai06.png",
  },
  {
    src: "/skin/img/sub/new-programai07.png",
    dest: "public/images/programs/new-programai07.png",
  },
  {
    src: "/skin/img/sub/new-programai08.png",
    dest: "public/images/programs/new-programai08.png",
  },
  {
    src: "/skin/img/sub/maker_activity_1_3d_printer.png",
    dest: "public/images/programs/maker_activity_1_3d_printer.png",
  },
  {
    src: "/skin/img/sub/maker_activity_2_3d_pen.png",
    dest: "public/images/programs/maker_activity_2_3d_pen.png",
  },
  {
    src: "/skin/img/sub/maker_activity_3_vr_movie.png",
    dest: "public/images/programs/maker_activity_3_vr_movie.png",
  },
  {
    src: "/skin/img/sub/maker_activity_4_ar_contents.png",
    dest: "public/images/programs/maker_activity_4_ar_contents.png",
  },
  {
    src: "/skin/img/sub/maker_activity_5_drone_steam.png",
    dest: "public/images/programs/maker_activity_5_drone_steam.png",
  },
  {
    src: "/skin/img/sub/maker_activity_6_robot_coding.png",
    dest: "public/images/programs/maker_activity_6_robot_coding.png",
  },
  {
    src: "/skin/img/sub/maker_activity_7_autonomous_car.png",
    dest: "public/images/programs/maker_activity_7_autonomous_car.png",
  },

  // Coding/Maker/STEAM program images
  {
    src: "/skin/img/sub/2020_visit_new_coding04.png",
    dest: "public/images/programs/2020_visit_new_coding04.png",
  },
  {
    src: "/skin/img/sub/2020_visit_new_coding05.png",
    dest: "public/images/programs/2020_visit_new_coding05.png",
  },
  {
    src: "/skin/img/sub/2020_visit_new_coding19.png",
    dest: "public/images/programs/2020_visit_new_coding19.png",
  },
  {
    src: "/skin/img/sub/2020_visit_new_coding23.png",
    dest: "public/images/programs/2020_visit_new_coding23.png",
  },
  {
    src: "/skin/img/sub/2020_visit_new_coding24.png",
    dest: "public/images/programs/2020_visit_new_coding24.png",
  },
  {
    src: "/skin/img/sub/2020_visit_new_maker01.png",
    dest: "public/images/programs/2020_visit_new_maker01.png",
  },
  {
    src: "/skin/img/sub/2020_visit_new_maker02.png",
    dest: "public/images/programs/2020_visit_new_maker02.png",
  },
  {
    src: "/skin/img/sub/2020_visit_new_steam03.png",
    dest: "public/images/programs/2020_visit_new_steam03.png",
  },
  {
    src: "/skin/img/sub/2020_visit_new_steam04.png",
    dest: "public/images/programs/2020_visit_new_steam04.png",
  },
  {
    src: "/skin/img/sub/2023_visit_coding_1.png",
    dest: "public/images/programs/2023_visit_coding_1.png",
  },
  {
    src: "/skin/img/sub/2023_visit_maker_1.png",
    dest: "public/images/programs/2023_visit_maker_1.png",
  },
  {
    src: "/skin/img/sub/2023_visit_new_steam01.png",
    dest: "public/images/programs/2023_visit_new_steam01.png",
  },

  // Camp images
  {
    src: "/skin/img/sub/edu01_1_16n.png",
    dest: "public/images/camps/edu01_1_16n.png",
  },
  {
    src: "/skin/img/sub/edu01_2_1n.png",
    dest: "public/images/camps/edu01_2_1n.png",
  },
  {
    src: "/skin/img/sub/edu01_3_1n.png",
    dest: "public/images/camps/edu01_3_1n.png",
  },
  {
    src: "/skin/img/sub/youth_camp_maker01.png",
    dest: "public/images/camps/youth_camp_maker01.png",
  },
  {
    src: "/skin/img/sub/youth_camp_steam01.png",
    dest: "public/images/camps/youth_camp_steam01.png",
  },
  {
    src: "/skin/img/sub/youth_camp_start01.png",
    dest: "public/images/camps/youth_camp_start01.png",
  },
  {
    src: "/skin/img/sub/youth_camp_coding01.png",
    dest: "public/images/camps/youth_camp_coding01.png",
  },

  // About/Company images
  {
    src: "/skin/img/sub/company01_7.jpg",
    dest: "public/images/about/company01_7.jpg",
  },
  {
    src: "/skin/img/sub/education_Introduction01.jpg",
    dest: "public/images/about/education_Introduction01.jpg",
  },
  {
    src: "/skin/img/sub/education_feature_2_leading_awareness.jpg",
    dest: "public/images/about/education_feature_2.jpg",
  },
  {
    src: "/skin/img/sub/education_feature_3_entreprenuer_spirit.jpg",
    dest: "public/images/about/education_feature_3.jpg",
  },

  // Lecture images
  {
    src: "/skin/img/sub/introduce_4_4th_industrial_lecture.jpg",
    dest: "public/images/lectures/4th_industrial_lecture.jpg",
  },
  {
    src: "/skin/img/sub/introduce_8_ceo_lecture.jpg",
    dest: "public/images/lectures/ceo_lecture.jpg",
  },
  {
    src: "/skin/img/sub/program_figure_1_4th_industrial_and_youth_entrepreneurship.png",
    dest: "public/images/lectures/program_figure_1.png",
  },
  {
    src: "/skin/img/sub/program_figure_2_relationship_traning.png",
    dest: "public/images/lectures/program_figure_2.png",
  },
  {
    src: "/skin/img/sub/program_figure_3_pbl_class.png",
    dest: "public/images/lectures/program_figure_3.png",
  },
  {
    src: "/skin/img/sub/program_figure_4_campus_tour.png",
    dest: "public/images/lectures/program_figure_4.png",
  },
  {
    src: "/skin/img/sub/program_figure_1_ceo_story.png",
    dest: "public/images/lectures/ceo_figure_1.png",
  },
  {
    src: "/skin/img/sub/program_figure_2_startup_market.png",
    dest: "public/images/lectures/ceo_figure_2.png",
  },
  {
    src: "/skin/img/sub/program_figure_3_talk_show.png",
    dest: "public/images/lectures/ceo_figure_3.png",
  },

  // Online education
  {
    src: "/skin/img/sub/online_maker03.png",
    dest: "public/images/online/online_maker03.png",
  },
  {
    src: "/skin/img/sub/online_maker04.png",
    dest: "public/images/online/online_maker04.png",
  },
  {
    src: "/skin/img/sub/online_maker05.png",
    dest: "public/images/online/online_maker05.png",
  },
  {
    src: "/skin/img/sub/online_coding07.png",
    dest: "public/images/online/online_coding07.png",
  },
  {
    src: "/skin/img/sub/online_special01.png",
    dest: "public/images/online/online_special01.png",
  },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadImage(
  srcPath: string,
  destRelPath: string
): Promise<{ success: boolean; dest: string; error?: string }> {
  const url = `${BASE_URL}${srcPath}`;
  const destAbsPath = path.join(process.cwd(), destRelPath);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(destAbsPath), { recursive: true });

  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: BASE_URL,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        dest: destRelPath,
        error: `HTTP ${response.status} ${response.statusText}`,
      };
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(destAbsPath, Buffer.from(buffer));

    const sizeKb = Math.round(buffer.byteLength / 1024);
    console.log(`  [OK] ${destRelPath} (${sizeKb} KB)`);
    return { success: true, dest: destRelPath };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return { success: false, dest: destRelPath, error };
  }
}

async function main() {
  console.log(`Downloading ${IMAGE_MAP.length} images from ${BASE_URL}...\n`);

  const results: Array<{ success: boolean; dest: string; error?: string }> = [];

  for (let i = 0; i < IMAGE_MAP.length; i++) {
    const { src, dest } = IMAGE_MAP[i];
    process.stdout.write(`[${i + 1}/${IMAGE_MAP.length}] ${src} → `);
    const result = await downloadImage(src, dest);
    results.push(result);
    if (!result.success) {
      console.log(`  [FAIL] ${result.error}`);
    }
    if (i < IMAGE_MAP.length - 1) {
      await sleep(100);
    }
  }

  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log("\n=== Download Summary ===");
  console.log(`Success: ${succeeded.length} / ${IMAGE_MAP.length}`);

  if (failed.length > 0) {
    console.log(`\nFailed (${failed.length}):`);
    for (const f of failed) {
      console.log(`  - ${f.dest}: ${f.error}`);
    }
  } else {
    console.log("All images downloaded successfully!");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
