"use client"

import { useTranslations } from "next-intl"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { ExperienceTab } from "./experience-tab"
import { MyStoryTab } from "./my-story-tab"
import { ProjectsTab } from "./projects-tab"
import { SkillsTab } from "./skills-tab"

import type { TalentProfile } from "../model/types"

type ProfileTabsProps = {
  profile: TalentProfile
}

export function ProfileTabs({ profile }: ProfileTabsProps) {
  const t = useTranslations("Profile")
  const showExperienceTab = profile.experience.length > 0

  return (
    <Tabs defaultValue="story" className="w-full">
      <TabsList
        variant="line"
        className="-mx-1 w-full gap-4 overflow-x-auto px-1 scrollbar-none sm:gap-6"
      >
        <TabsTrigger value="story" className="shrink-0 whitespace-nowrap">
          {t("myStory")}
        </TabsTrigger>
        <TabsTrigger value="skills" className="shrink-0 whitespace-nowrap">
          {t("skills")}
        </TabsTrigger>
        <TabsTrigger value="projects" className="shrink-0 whitespace-nowrap">
          {t("projects")}
        </TabsTrigger>
        {showExperienceTab ? (
          <TabsTrigger value="experience" className="shrink-0 whitespace-nowrap">
            {t("experienceTab")}
          </TabsTrigger>
        ) : null}
      </TabsList>
      <TabsContent value="story">
        <MyStoryTab profile={profile} />
      </TabsContent>
      <TabsContent value="skills">
        <SkillsTab profile={profile} />
      </TabsContent>
      <TabsContent value="projects">
        <ProjectsTab profile={profile} />
      </TabsContent>
      {showExperienceTab ? (
        <TabsContent value="experience">
          <ExperienceTab profile={profile} />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
